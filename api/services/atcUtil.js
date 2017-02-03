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
          if (results.hasOwnProperty('ids')) ids = results[0].ids;
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

          Atc.native(function (err, collection) {
            if (err) reject(err);
            collection.updateOne(
              {nroatc: nroatc},
              {$set: item},
              {upsert: true}, function (err, results) {
                results = JSON.parse(results);
                allIds.push(item._id);
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
        xml.on('end', function () {
          sails.log.info("[CRON] - Finished updating ATC.");
          sails.log.info("[CRON] - Items inserted: " + insertedIds.length);
          sails.log.info("[CRON] - Items updated: " + updatedIds.length);

          //Compare new IDS with old ones.
          var deletedIds = _.difference(ids, allIds);
          sails.log.info("[CRON] - Items to delete: " + deletedIds.toString());

          //TODO: Delete ids which not included.
          resolve();
        });


      })
    });

  });

  // return new Promise(function (resolve, reject) {
  //   sails.log.info('[CRON] - Destroying ATC Collection.');
  //   Atc.destroy().exec(function (err) {
  //     if (err) {
  //       sails.log.error("[CRON] - Error while destroying ATC.");
  //       reject();
  //     }
  //     else {
  //       sails.log.info('[CRON] - Updating ATC.');
  //       var stream = fs.createReadStream('data/DICCIONARIO_ATC.xml');
  //       var xml = new XmlStream(stream);
  //       xml.collect('atc');
  //       xml.on('endElement: atc', function (item) {
  //         xml.pause();
  //         item.id = item.nroatc;
  //         sails.log.info("ITEM : "+JSON.stringify(item));
  //         Atc.create(item).exec(function (err, data) {
  //           if (err) reject(err);
  //           else {
  //             xml.resume();
  //           }
  //         })
  //       });
  //       xml.on('end', function () {
  //         sails.log.info("[CRON] - Finished updating ATC.");
  //         resolve();
  //       });
  //     }
  //   })
  // });
  //
  //
  //       // fs.readFile('data/DICCIONARIO_ATC.xml', function (err, data) {
  //       //   parser.parseString(data, function (err, data) {
  //       //     var index = data.aemps_prescripcion_atc.atc;
  //       //     var count = 0;
  //       //     for (var item in index) {
  //       //       if (index.hasOwnProperty(item)) {
  //       //         var nroatc = index[item].nroatc.toString();
  //       //         var codigoatc = index[item].codigoatc.toString();
  //       //         var descatc = index[item].descatc.toString();
  //       //         Atc.create({
  //       //           nro_atc: nroatc,
  //       //           cod_atc: codigoatc,
  //       //           des_catc: descatc
  //       //         }).exec(function (err, data) {
  //       //           if (err) reject(err);
  //       //           else {
  //       //             count++;
  //       //             if (count == index.length) resolve();
  //       //           }
  //       //         })
  //       //       }
  //       //     }
  //       //   })
  //       // })
  //
  //     }
  //   })
  // });
};
