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
    sails.log.info('[CRON] - Destroying Ffarmaceutica Collection.');
    Ffarmaceutica.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Ffarmaceutica.");
        reject();
      }
      else {
        sails.log.info('[CRON] - Updating Ffarmaceutica.');
        var stream = fs.createReadStream('data/DICCIONARIO_FORMA_FARMACEUTICA.xml');
        var xml = new XmlStream(stream);
        xml.collect('formasfarmaceuticas');
        xml.on('endElement: formasfarmaceuticas', function (item) {
          xml.pause();
          Ffarmaceutica.create(item).exec(function (err, data) {
            if (err) reject(err);
            else {
              xml.resume();
            }
          })
        });
        xml.on('end', function () {
          sails.log.info("[CRON] - Finished updating Ffarmaceutica.");
          resolve();
        });


        // fs.readFile('data/DICCIONARIO_FORMA_FARMACEUTICA.xml', function (err, data) {
        //   parser.parseString(data, function (err, data) {
        //     var index = data.aemps_prescripcion_formas_farmaceuticas.formasfarmaceuticas;
        //     var count = 0;
        //     for (var item in index) {
        //       if (index.hasOwnProperty(item)) {
        //         var codigoformafarmaceutica = index[item].codigoformafarmaceutica.toString();
        //         var formafarmaceutica = index[item].formafarmaceutica.toString();
        //         var codigoformafarmaceuticasimplificada = index[item].codigoformafarmaceuticasimplificada.toString();
        //         Ffarmaceutica.create({
        //           cod_forfar: codigoformafarmaceutica,
        //           forfar: formafarmaceutica,
        //           cod_forfar_simplificada: codigoformafarmaceuticasimplificada
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
