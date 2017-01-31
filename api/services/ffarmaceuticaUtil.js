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
    sails.log.info('[CRON] - Destroying Ffarmaceutica Collection.');
    Ffarmaceutica.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Ffarmaceutica.");
        reject();
      }
      else {
        Ffarmaceutica.count().exec(function (error, count) {
          sails.log.info("[CRON] - Found " + count + " items in Ffarmaceutica");
          sails.log.info('[CRON] - Updating Ffarmaceutica.');
          fs.readFile('data/DICCIONARIO_FORMA_FARMACEUTICA.xml', function (err, data) {
            parser.parseString(data, function (err, data) {
              var index = data.aemps_prescripcion_formas_farmaceuticas.formasfarmaceuticas;
              var count = 0;
              for (var item in index) {
                if (index.hasOwnProperty(item)) {
                  var codigoformafarmaceutica = index[item].codigoformafarmaceutica.toString();
                  var formafarmaceutica = index[item].formafarmaceutica.toString();
                  var codigoformafarmaceuticasimplificada = index[item].codigoformafarmaceuticasimplificada.toString();
                  Ffarmaceutica.create({
                    cod_forfar: codigoformafarmaceutica,
                    forfar: formafarmaceutica,
                    cod_forfar_simplificada: codigoformafarmaceuticasimplificada
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
