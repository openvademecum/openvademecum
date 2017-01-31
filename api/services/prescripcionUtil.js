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
const XmlStream = require('xml-stream');

module.exports.update = function () {

  return new Promise(function (resolve, reject) {
    sails.log.info('[CRON] - Destroying Prescripcion Collection.');
    Prescripcion.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Prescripcion.");
        reject();
      }
      else {
        sails.log.info('[CRON] - Updating Prescripcion.');
        var stream = fs.createReadStream('data/Prescripcion.xml');
        var xml = new XmlStream(stream);
        xml.collect('prescripcion');
        xml.on('endElement: prescription', function (item) {
          xml.pause();
          Prescripcion.create(item).exec(function (err, data) {
            if (err) reject(err);
            else {
              xml.resume();
            }
          })
        });
        xml.on('end', function () {
          sails.log.info("[CRON] - Finished updating Prescripcion.");
          resolve();
        });
      }
    })
  });
};
