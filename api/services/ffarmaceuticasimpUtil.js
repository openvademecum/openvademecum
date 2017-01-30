/**
 * Update Services
 *
 * @description ::
 * @author      :: Alejandro González - algope@github
 * @licence     ::
 *
 */

const fs = require('fs');
const xml2js = require('xml2js');

var parser = new xml2js.Parser({explicitArray: false});

module.exports.update = function () {

  return new Promise(function (resolve, reject) {
    sails.log.info('[CRON] - Destroying Ffarmaceuticasimp Collection.');
    Ffarmaceuticasimp.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Ffarmaceuticasimp.");
        reject();
      }
      else {
        Ffarmaceuticasimp.count().exec(function (error, count) {
          sails.log.info("[CRON] - Found " + count + " items in Ffarmaceuticasimp");
          sails.log.info('[CRON] - Updating Ffarmaceuticasimp.');
          fs.readFile('data/DICCIONARIO_FORMA_FARMACEUTICA_SIMPLIFICADAS.xml', function (err, data) {
            parser.parseString(data, function (err, data) {
              var index = data.aemps_prescripcion_formas_farmaceuticas_simplificadas.formasfarmaceuticassimplificadas;
              var count = 0;
              for (var item in index) {
                if (index.hasOwnProperty(item)) {
                  var codigoformafarmaceuticasimplificada = index[item].codigoformafarmaceuticasimplificada.toString();
                  var formafarmaceuticasimplificada = index[item].formafarmaceuticasimplificada.toString();
                  Ffarmaceuticasimp.create({
                    cod_forfar_simplificada: codigoformafarmaceuticasimplificada,
                    forfar_simplificada: formafarmaceuticasimplificada
                  }).exec(function (err, data) {
                    if (err) reject(err);
                    else {
                      count++;
                      if (count == index.length) resolve();
                    }
                  })
                }
              }
            })
          })
        });
      }
    })
  });
};
