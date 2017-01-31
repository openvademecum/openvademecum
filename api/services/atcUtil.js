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
    sails.log.info('[CRON] - Destroying ATC Collection.');
    Atc.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying ATC.");
        reject();
      }
      else {
        sails.log.info('[CRON] - Updating ATC.');
        var stream = fs.createReadStream('data/DICCIONARIO_ATC.xml');
        var xml = new XmlStream(stream);
        xml.collect('atc');
        xml.on('endElement: atc', function (item) {
          xml.pause();
          Atc.create(item).exec(function (err, data) {
            if (err) reject(err);
            else {
              xml.resume();
            }
          })
        });
        xml.on('end', function () {
          sails.log.info("[CRON] - Finished updating ATC.");
          resolve();
        });


        // fs.readFile('data/DICCIONARIO_ATC.xml', function (err, data) {
        //   parser.parseString(data, function (err, data) {
        //     var index = data.aemps_prescripcion_atc.atc;
        //     var count = 0;
        //     for (var item in index) {
        //       if (index.hasOwnProperty(item)) {
        //         var nroatc = index[item].nroatc.toString();
        //         var codigoatc = index[item].codigoatc.toString();
        //         var descatc = index[item].descatc.toString();
        //         Atc.create({
        //           nro_atc: nroatc,
        //           cod_atc: codigoatc,
        //           des_catc: descatc
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
