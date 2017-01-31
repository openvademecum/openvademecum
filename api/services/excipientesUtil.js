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
    sails.log.info('[CRON] - Destroying Excipientes Collection.');
    Excipientes.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Excipientes.");
        reject();
      }
      else {
        Excipientes.count().exec(function (error, count) {
          sails.log.info("[CRON] - Found " + count + " items in Excipientes");
          sails.log.info('[CRON] - Updating Excipientes.');
          fs.readFile('data/DICCIONARIO_EXCIPIENTES_DECL_OBLIGATORIA.xml', function (err, data) {
            parser.parseString(data, function (err, data) {
              var index = data.aemps_prescripcion_excipientes.excipientes;
              var count = 0;
              for (var item in index) {
                if (index.hasOwnProperty(item)) {
                  var codigoedo = index[item].codigoedo.toString();
                  var edo = index[item].edo.toString();
                  Excipientes.create({
                    cod_excipiente: codigoedo,
                    edo: edo
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
