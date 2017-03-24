/**
 * Update Services
 *
 * @description ::
 * @author      :: Alejandro González - algope@github
 * @licence     ::
 *
 */

const fs = require('fs');
const _ = require('lodash');
const XmlStream = require('xml-stream');


/******************Model Variables**********************/

const itemName = 'unidadescontenido';
const modelName = 'unicont';
const itemIdName = 'codigounidadcontenido';
const xmlFile = 'data/DICCIONARIO_UNIDAD_CONTENIDO.xml';
const endCollection = 'aemps_prescripcion_unidad_contenido';

/************************END*****************************/


module.exports.update = function () {
  return new Promise(function (resolve, reject) {

    var insertedIds = [];
    var updatedIds = [];
    var allIds = [];
    var ids = [];

    sails.log.info("[CRON] - [Unicont] - Updating Unicont...");


    //Get all Collection IDs
    Unicont.native(function (err, collection) {

      if (err) reject(err);
      collection.aggregate([{$group: {_id: null, ids: {$addToSet: "$_id"}}}]).toArray(function (err, results) {
        if (err) reject(err);
        else if (results[0] && results[0].hasOwnProperty('ids')) ids = results[0].ids;

        var stream = fs.createReadStream(xmlFile);
        var xml = new XmlStream(stream);
        //Create or update of all entries on xml
        xml.collect(itemName);
        xml.on('endElement: ' + itemName, function (item) {
          xml.pause();

          var element = item;
          var id = item[itemIdName];
          delete item[itemIdName];
          item._id = id;
          allIds.push(item._id);

          Unicont.findOne({_id: item._id}).exec(function (err, oldItem) {
            if (err) reject(err);
            Unicont.native(function (err, collection) {
              if (err) reject(err);
              collection.updateOne({codigounidadcontenido: id}, {$set: item}, {upsert: true}, function (err, results) {
                if (err) reject(err);
                results = JSON.parse(results);
                if (results.hasOwnProperty('upserted')) {
                  //Item inserted
                  insertedIds.push(results.upserted[0]._id);
                  Updates.create({
                    model: modelName,
                    new_item: element,
                    inserted: true,
                    updated: false,
                    deleted: false
                  }).exec(function (err, results) {
                    if (err) reject(err);
                    xml.resume()
                  })
                } else if (results['nModified'] == 1) {
                  //Item modified
                  updatedIds.push(item._id);
                  Updates.create({
                    model: modelName,
                    old_item: oldItem,
                    new_item: element,
                    inserted: false,
                    updated: true,
                    deleted: false
                  }).exec(function (err, results) {
                    if (err) reject(err);
                    xml.resume();
                  })
                } else xml.resume();
              })
            });

          });


        });
        xml.on('endElement: ' + endCollection, function () {
          //Compare new IDS with old ones.
          var deletedIds = _.difference(ids, allIds);

          //Delete ids not included.
          Unicont.native(function (err, collection) {
            if (err) reject(err);

            deletedIds.forEach(function (entry) {
              Unicont.findOne({_id: entry}).exec(function (err, beforeDelete) {
                if (err) reject(err);

                collection.deleteOne({_id: entry}, function (err, results) {
                  if (err) reject(err);
                  Updates.create({
                    model: modelName,
                    old_item: beforeDelete,
                    inserted: false,
                    updated: false,
                    deleted: true
                  }).exec(function (err, results) {
                    if (err) reject(err);
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
