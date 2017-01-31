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
    sails.log.info('[CRON] - Destroying Prescripcion Collection.');
    Prescripcion.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Prescripcion.");
        reject();
      }
      else {
        Prescripcion.count().exec(function (error, count) {
          sails.log.info("[CRON] - Found " + count + " items in Prescripcion");
          sails.log.info('[CRON] - Updating Prescripcion.');
          fs.readFile('data/Prescripcion.xml', function (err, data) {
            parser.parseString(data, function (err, data) {
              var index = data.aemps_prescripcion.prescription;
              for (var item in index) {
                if (index.hasOwnProperty(item)) {
                  Prescripcion.create(index[item]).exec(function (err, data) {
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
