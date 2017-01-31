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
    sails.log.info('[CRON] - Destroying Vadmon Collection.');
    Vadmon.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Vadmon.");
        reject();
      }
      else {
        sails.log.info('[CRON] - Updating Vadmon.');
        var stream = fs.createReadStream('data/DICCIONARIO_VIAS_ADMINISTRACION.xml');
        var xml = new XmlStream(stream);
        xml.collect('viasadministracion');
        xml.on('endElement: viasadministracion', function (item) {
          xml.pause();
          Vadmon.create(item).exec(function (err, data) {
            if (err) reject(err);
            else {
              xml.resume();
            }
          })
        });
        xml.on('end', function () {
          sails.log.info("[CRON] - Finished updating Vadmon.");
          resolve();
        });


        // fs.readFile('data/DICCIONARIO_VIAS_ADMINISTRACION.xml', function (err, data) {
        //   parser.parseString(data, function (err, data) {
        //     var index = data.aemps_prescripcion_vias_administracion.viasadministracion;
        //     for (var item in index) {
        //       if (index.hasOwnProperty(item)) {
        //         var codigoviaadministracion = index[item].codigoviaadministracion.toString();
        //         var viaadministracion = index[item].viaadministracion.toString();
        //         Vadmon.create({
        //           cod_via_admin: codigoviaadministracion,
        //           via_admin: viaadministracion
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
