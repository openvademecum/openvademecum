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
    sails.log.info('[CRON] - Destroying Ffarmaceuticasimp Collection.');
    Ffarmaceuticasimp.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Ffarmaceuticasimp.");
        reject();
      }
      else {
        sails.log.info('[CRON] - Updating Ffarmaceuticasimp.');
        var stream = fs.createReadStream('data/DICCIONARIO_FORMA_FARMACEUTICA_SIMPLIFICADAS.xml');
        var xml = new XmlStream(stream);
        xml.collect('formasfarmaceuticassimplificadas');
        xml.on('endElement: formasfarmaceuticassimplificadas', function (item) {
          xml.pause();
          Ffarmaceuticasimp.create(item).exec(function (err, data) {
            if (err) reject(err);
            else {
              xml.resume();
            }
          })
        });
        xml.on('end', function () {
          sails.log.info("[CRON] - Finished updating Ffarmaceuticasimp.");
          resolve();
        });



        // fs.readFile('data/DICCIONARIO_FORMA_FARMACEUTICA_SIMPLIFICADAS.xml', function (err, data) {
        //   parser.parseString(data, function (err, data) {
        //     var index = data.aemps_prescripcion_formas_farmaceuticas_simplificadas.formasfarmaceuticassimplificadas;
        //     var count = 0;
        //     for (var item in index) {
        //       if (index.hasOwnProperty(item)) {
        //         var codigoformafarmaceuticasimplificada = index[item].codigoformafarmaceuticasimplificada.toString();
        //         var formafarmaceuticasimplificada = index[item].formafarmaceuticasimplificada.toString();
        //         Ffarmaceuticasimp.create({
        //           cod_forfar_simplificada: codigoformafarmaceuticasimplificada,
        //           forfar_simplificada: formafarmaceuticasimplificada
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
