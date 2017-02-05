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
    sails.log.info('[CRON] - Destroying Sitregistro Collection.');
    Sitregistro.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Sitregistro.");
        reject();
      }
      else {
        sails.log.info('[CRON] - Updating Sitregistro.');
        var stream = fs.createReadStream('data/DICCIONARIO_SITUACION_REGISTRO.xml');
        var xml = new XmlStream(stream);
        xml.collect('situacionesregistro');
        xml.on('endElement: situacionesregistro', function (item) {
          xml.pause();
          Sitregistro.create(item).exec(function (err, data) {
            if (err) reject(err);
            else {
              xml.resume();
            }
          })
        });
        xml.on('end', function () {
          sails.log.info("[CRON] - Finished updating Sitregistro.");
          resolve();
        });




        // fs.readFile('data/DICCIONARIO_SITUACION_REGISTRO.xml', function (err, data) {
        //   parser.parseString(data, function (err, data) {
        //     var index = data.aemps_prescripcion_situacion_registro.situacionesregistro;
        //     for (var item in index) {
        //       if (index.hasOwnProperty(item)) {
        //         var codigosituacionregistro = index[item].codigosituacionregistro.toString();
        //         var situacionregistro = index[item].situacionregistro.toString();
        //         Sitregistro.create({
        //           cod_sitreg: codigosituacionregistro,
        //           situacionregistro: situacionregistro
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
