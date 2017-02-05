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
    sails.log.info('[CRON] - Destroying Envases Collection.');
    Envases.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Envases.");
        reject();
      }
      else {
        sails.log.info('[CRON] - Updating Envases.');
        var stream = fs.createReadStream('data/DICCIONARIO_ENVASES.xml');
        var xml = new XmlStream(stream);
        xml.collect('envases');
        xml.on('endElement: envases', function (item) {
          xml.pause();
          Envases.create(item).exec(function (err, data) {
            if (err) reject(err);
            else {
              xml.resume();
            }
          })
        });
        xml.on('end', function () {
          sails.log.info("[CRON] - Finished updating Envases.");
          resolve();
        });



        // fs.readFile('data/DICCIONARIO_ENVASES.xml', function (err, data) {
        //   parser.parseString(data, function (err, data) {
        //     var index = data.aemps_prescripcion_envases.envases;
        //     var count = 0;
        //     for (var item in index) {
        //       if (index.hasOwnProperty(item)) {
        //         var codigoenvase = index[item].codigoenvase.toString();
        //         var envase = index[item].envase.toString();
        //         Envases.create({
        //           cod_envase: codigoenvase,
        //           envase: envase
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
