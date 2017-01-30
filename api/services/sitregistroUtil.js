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
    sails.log.info('[CRON] - Destroying Sitregistro Collection.');
    Sitregistro.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Sitregistro.");
        reject();
      }
      else {
        Sitregistro.count().exec(function (error, count) {
          sails.log.info("[CRON] - Found " + count + " items in Sitregistro");
          sails.log.info('[CRON] - Updating Sitregistro.');
          fs.readFile('data/DICCIONARIO_SITUACION_REGISTRO.xml', function (err, data) {
            parser.parseString(data, function (err, data) {
              var index = data.aemps_prescripcion_situacion_registro.situacionesregistro;
              for (var item in index) {
                if (index.hasOwnProperty(item)) {
                  var codigosituacionregistro = index[item].codigosituacionregistro.toString();
                  var situacionregistro = index[item].situacionregistro.toString();
                  Sitregistro.create({
                    cod_sitreg: codigosituacionregistro,
                    situacionregistro: situacionregistro
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
