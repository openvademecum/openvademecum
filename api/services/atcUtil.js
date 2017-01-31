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
    sails.log.info('[CRON] - Destroying ATC Collection.');
    Atc.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying ATC.");
        reject();
      }
      else {
        Atc.count().exec(function (error, count) {
          sails.log.info("[CRON] - Found " + count + " items in ATC");
          sails.log.info('[CRON] - Updating ATC.');
          fs.readFile('data/DICCIONARIO_ATC.xml', function (err, data) {
            parser.parseString(data, function (err, data) {
              var index = data.aemps_prescripcion_atc.atc;
              var count = 0;
              for (var item in index) {

                if (index.hasOwnProperty(item)) {
                  var nroatc = index[item].nroatc.toString();
                  var codigoatc = index[item].codigoatc.toString();
                  var descatc = index[item].descatc.toString();
                  Atc.create({
                    nro_atc: nroatc,
                    cod_atc: codigoatc,
                    des_catc: descatc
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
