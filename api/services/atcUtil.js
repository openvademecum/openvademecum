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
      if (err) reject(err);

      collection.aggregate([
        {$group: {_id: null, ids: {$addToSet: "$_id"}}}
      ]).toArray(function (err, results) {
        if (err) reject(err);
        else if (ids) {

          if (results[0].hasOwnProperty('ids')) ids = results[0].ids;
          sails.log.info("# # IDS raw: > "+results[0].ids.length);
          sails.log.info("# # IDS: > "+ids.length);
        }

        //Create or update of all entries on xml
        var stream = fs.createReadStream('data/DICCIONARIO_ATC.xml');
        var xml = new XmlStream(stream);
        xml.collect('atc');
        xml.on('endElement: atc', function (item) {
          xml.pause();
          var nroatc = item.nroatc;
          delete item.nroatc;
          item._id = nroatc;
          allIds.push(item._id);

          Atc.native(function (err, collection) {
            if (err) reject(err);
            collection.updateOne(
              {nroatc: nroatc},
              {$set: item},
              {upsert: true}, function (err, results) {
                results = JSON.parse(results);
                if (err) reject(err);
                if (results.hasOwnProperty('upserted')) {
                  //Item inserted
                  insertedIds.push(results.upserted[0]._id);
                } else if (results['nModified'] == 1) {
                  //Item modified
                  updatedIds.push(item._id);
                }
                xml.resume();
              })
          });
        });
        xml.on('endElement: aemps_prescripcion_atc', function () {
          //Compare new IDS with old ones.
          var deletedIds = _.difference(ids, allIds);
          sails.log.info("[CRON] - Finished updating ATC.");
          sails.log.info("[CRON] - # items inserted: " + insertedIds.length);
          sails.log.info("[CRON] - # items updated: " + updatedIds.length);
          sails.log.info("[CRON] - # items to delete: " + deletedIds.length);
          sails.log.info("[CRON] - # ids in database: "+ids.length);
          sails.log.info("[CRON] - # ids in document: "+allIds.length);
          sails.log.info("[CRON] - Items to delete: " + deletedIds.toString());

          //Delete ids not included.
          Atc.native(function (err, collection){
            if(err) reject(err);
            deletedIds.forEach(function (entry){
              collection.deleteOne({_id: entry}, function(err, results){
                sails.log.info("[CRON] - Deleted item: "+entry);
                sails.log.info("[CRON] - Deleted item results: "+JSON.stringify(results));
              })
            })

          });



          resolve();
        });
      })
    });
  });
};
