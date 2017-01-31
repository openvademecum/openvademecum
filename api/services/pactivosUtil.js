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
    sails.log.info('[CRON] - Destroying Pactivos Collection.');
    Pactivos.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Pactivos.");
        reject();
      }
      else {
        sails.log.info('[CRON] - Updating Pactivos.');
        var stream = fs.createReadStream('data/DICCIONARIO_PRINCIPIOS_ACTIVOS.xml');
        var xml = new XmlStream(stream);
        xml.collect('principiosactivos');
        xml.on('endElement: principiosactivos', function (item) {
          xml.pause();
          Pactivos.create(item).exec(function (err, data) {
            if (err) reject(err);
            else {
              xml.resume();
            }
          })
        });
        xml.on('end', function () {
          sails.log.info("[CRON] - Finished updating Pactivos.");
          resolve();
        });



        // fs.readFile('data/DICCIONARIO_PRINCIPIOS_ACTIVOS.xml', function (err, data) {
        //   parser.parseString(data, function (err, data) {
        //     var index = data.aemps_prescripcion_principios_activos.principiosactivos;
        //     var count = 0;
        //     for (var item in index) {
        //       if (index.hasOwnProperty(item)) {
        //         var nroprincipioactivo = index[item].nroprincipioactivo.toString();
        //         var codigoprincipioactivo = index[item].codigoprincipioactivo.toString();
        //         var principioactivo = index[item].principioactivo.toString();
        //         Pactivos.create({
        //           nro_principio_activo: nroprincipioactivo,
        //           cod_principio_activo: codigoprincipioactivo,
        //           principio_activo: principioactivo
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
