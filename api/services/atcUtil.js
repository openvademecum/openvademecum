/**
 * Update Services
 *
 * @description ::
 * @author      :: Alejandro González - algope@github
 * @licence     ::
 *
 */

const fs = require('fs');
const XmlStream = require('xml-stream');
const _ = require('lodash');

module.exports.update = function () {
  return new Promise(function (resolve, reject) {
    var insertedIds = [];
    var updatedIds = [];
    var allIds = [];
    var ids = [];

    //Get all Collection IDs
    Atc.native(function (err, collection) {
      if (err) {
        sails.log.error("[ERROR] - " + JSON.stringify(err));
        reject(err)
      }

      collection.aggregate([
        {$group: {_id: null, ids: {$addToSet: "$_id"}}}
      ]).toArray(function (err, results) {
        if (err) {
          sails.log.error("[ERROR] - " + JSON.stringify(err));
          reject(err)
        }
        else if (results[0]) {
          if (results[0].hasOwnProperty('ids')) ids = results[0].ids;
        }

        //Create or update of all entries on xml
        var stream = fs.createReadStream('data/DICCIONARIO_ATC.xml');
        var xml = new XmlStream(stream);
        xml.collect('atc');
        xml.on('endElement: atc', function (item) {
          xml.pause();
          var element = item;
          var nroatc = item.nroatc;
          delete item.nroatc;
          item._id = nroatc;
          allIds.push(item._id);
          Atc.findOne({_id: item._id}).exec(function (ko, oldItem) {
            if (ko) {
              sails.log.error("[ERROR] - " + JSON.stringify(ko));
              reject(ko)
            }
            Atc.native(function (err, collection) {
              if (err) {
                sails.log.error("[ERROR] - " + JSON.stringify(err));
                reject(err)
              }
              collection.updateOne(
                {nroatc: nroatc},
                {$set: item},
                {upsert: true}, function (err, results) {
                  results = JSON.parse(results);
                  if (err) {
                    sails.log.error("[ERROR] - " + JSON.stringify(err));
                    reject(err)
                  }
                  if (results.hasOwnProperty('upserted')) {
                    //Item inserted
                    insertedIds.push(results.upserted[0]._id);
                    Updates.create({
                      model: 'atc',
                      new_item: element,
                      inserted: true,
                      updated: false,
                      deleted: false
                    }).exec(function (ko, ok) {
                      if (ko) {
                        sails.log.error("[ERROR] - " + JSON.stringify(ko));
                        reject(ko)
                      }
                      xml.resume()
                    })
                  } else if (results['nModified'] == 1) {
                    //Item modified
                    updatedIds.push(item._id);
                    sails.log.info("OLDITEM: " + JSON.stringify(oldItem));
                    Updates.create({
                      model: 'atc',
                      old_item: oldItem,
                      new_item: element,
                      inserted: false,
                      updated: true,
                      deleted: false
                    }).exec(function (ko, ok) {
                      if (ko) {
                        sails.log.error("[ERROR] - " + JSON.stringify(ko));
                        reject(ko)
                      }
                      xml.resume();
                    })
                  } else xml.resume();
                })
            });

          });


        });
        xml.on('endElement: aemps_prescripcion_atc', function () {
          //Compare new IDS with old ones.
          var deletedIds = _.difference(ids, allIds);

          //Delete ids not included.
          Atc.native(function (err, collection) {
            if (err) {
              sails.log.error("[ERROR] - " + JSON.stringify(err));
              reject(err)
            }
            deletedIds.forEach(function (entry) {
              Atc.findOne({_id: entry}).exec(function (ko, beforeDelete) {
                if (ko) {
                  sails.log.error("[ERROR] - " + ko);
                  reject(ko)
                }
                collection.deleteOne({_id: entry}, function (err, results) {
                  Updates.create({
                    model: 'atc',
                    old_item: beforeDelete,
                    inserted: false,
                    updated: false,
                    deleted: true
                  }).exec(function (ko, ok) {
                    if (ko) {
                      sails.log.error("[ERROR] - " + JSON.stringify(ko));
                      reject(ko)
                    }
                  })
                })
              })
            })
          });
          resolve();
        });
      })
    });
  });
};
