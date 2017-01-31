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
    sails.log.info('[CRON] - Destroying Envases Collection.');
    Envases.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Envases.");
        reject();
      }
      else {
        Envases.count().exec(function (error, count) {
          sails.log.info("[CRON] - Found " + count + " items in Envases");
          sails.log.info('[CRON] - Updating Envases.');
          fs.readFile('data/DICCIONARIO_ENVASES.xml', function (err, data) {
            parser.parseString(data, function (err, data) {
              var index = data.aemps_prescripcion_envases.envases;
              var count = 0;
              for (var item in index) {
                if (index.hasOwnProperty(item)) {
                  var codigoenvase = index[item].codigoenvase.toString();
                  var envase = index[item].envase.toString();
                  Envases.create({
                    cod_envase: codigoenvase,
                    envase: envase
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