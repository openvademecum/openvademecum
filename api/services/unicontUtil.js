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
    sails.log.info('[CRON] - Destroying Unicont Collection.');
    Unicont.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Unicont.");
        reject();
      }
      else {
        Unicont.count().exec(function (error, count) {
          sails.log.info("[CRON] - Found " + count + " items in Unicont");
          sails.log.info('[CRON] - Updating Unicont.');
          fs.readFile('data/DICCIONARIO_UNIDAD_CONTENIDO.xml', function (err, data) {
            parser.parseString(data, function (err, data) {
              var index = data.aemps_prescripcion_unidad_contenido.unidadescontenido;
              for (var item in index) {
                if (index.hasOwnProperty(item)) {
                  var codigounidadcontenido = index[item].codigounidadcontenido.toString();
                  var unidadcontenido = index[item].unidadcontenido.toString();
                  Unicont.create({
                    unid_contenido: codigounidadcontenido,
                    unidadcontenido: unidadcontenido
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
