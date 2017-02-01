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

module.exports.update = function () {
  return new Promise(function (resolve, reject) {
    //TODO: Get all Collection IDs
    Atc.native(function (err, collection) {
      if (err) reject(err);

      collection.aggregate([
        {$group: {_id: null, ids: {$addToSet: "$_id"}}}
      ]).toArray(function (err, results) {
        if (err) reject(err);
        else if (ids) {
          var ids = results[0].ids;
        }

        //TODO: Create or update of all entries on xml
        var stream = fs.createReadStream('data/DICCIONARIO_ATC.xml');
        var xml = new XmlStream(stream);
        xml.collect('atc');
        xml.on('endElement: atc', function (res) {
          xml.pause();
          res._id = res.nroatc;



          var item = res;
          var aux = item;




          sails.log.info("AUXITEMBEFORE: "+JSON.stringify(aux));

          delete item['nroatc'];

          sails.log.info("AUXITEM: "+JSON.stringify(aux));



          sails.log.info("ITEMAUX: "+item);
          Atc.native(function (err, collection) {
            if (err) reject(err);
            collection.updateOne(
              {nroatc: aux.nroatc},
              {$set: item},
              {upsert: true}, function (err, results) {
                if (err) reject(err);
                sails.log.info("RESULTS: " + JSON.stringify(results));
                //xml.resume();
              })
          });
        });
        xml.on('end', function () {
          sails.log.info("[CRON] - Finished updating ATC.");
          resolve();
        });


        //TODO: Compare new IDS with old ones.

        //TODO: Delete ids which not included.
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
