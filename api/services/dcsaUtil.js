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
    sails.log.info('[CRON] - Destroying DCSA Collection.');
    Dcsa.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying DCSA.");
        reject();
      }
      else {
        sails.log.info('[CRON] - Updating DCSA.');
        var stream = fs.createReadStream('data/DICCIONARIO_DCSA.xml');
        var xml = new XmlStream(stream);
        xml.collect('dcsa');
        xml.on('endElement: dcsa', function (item) {
          xml.pause();
          Dcsa.create(item).exec(function (err, data) {
            if (err) reject(err);
            else {
              xml.resume();
            }
          })
        });
        xml.on('end', function () {
          sails.log.info("[CRON] - Finished updating DCSA.");
          resolve();
        });




        // fs.readFile('data/DICCIONARIO_DCSA.xml', function (err, data) {
        //   parser.parseString(data, function (err, data) {
        //     var index = data.aemps_prescripcion_dcsa.dcsa;
        //     var count = 0;
        //     for (var item in index) {
        //       if (index.hasOwnProperty(item)) {
        //         var codigodcsa = index[item].codigodcsa.toString();
        //         var nombredcsa = index[item].nombredcsa.toString();
        //         Dcsa.create({
        //           codigodcsa: codigodcsa,
        //           nombredcsa: nombredcsa
        //         }).exec(function (err, data) {
        //           if (err) reject(err);
        //           else {
        //             count++;
        //             if (count == index.length) resolve();
        //           }
        //         })
        //       }
        //     }
        //   })
        // })

      }
    })
  });
};
