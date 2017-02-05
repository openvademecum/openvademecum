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
    sails.log.info('[CRON] - Destroying DCP Collection.');
    Dcp.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying DCP.");
        reject();
      }
      else {
        sails.log.info('[CRON] - Updating DCP.');
        var stream = fs.createReadStream('data/DICCIONARIO_DCP.xml');
        var xml = new XmlStream(stream);
        xml.collect('dcp');
        xml.on('endElement: dcp', function (item) {
          xml.pause();
          Dcp.create(item).exec(function (err, data) {
            if (err) reject(err);
            else {
              xml.resume();
            }
          })
        });
        xml.on('end', function () {
          sails.log.info("[CRON] - Finished updating DCP.");
          resolve();
        });


        // fs.readFile('data/DICCIONARIO_DCP.xml', function (err, data) {
        //   parser.parseString(data, function (err, data) {
        //     var index = data.aemps_prescripcion_dcp.dcp;
        //     var count = 0;
        //     for (var item in index) {
        //
        //       if (index.hasOwnProperty(item)) {
        //         var codigodcp = index[item].codigodcp.toString();
        //         var nombredcp = index[item].nombredcp.toString();
        //         Dcp.create({
        //           codigodcp: codigodcp,
        //           nombredcp: nombredcp
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
