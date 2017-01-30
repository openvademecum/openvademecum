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
    sails.log.info('[CRON] - Destroying DCP Collection.');
    Dcp.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Dcp.");
        reject();
      }
      else {
        Dcp.count().exec(function (error, count) {
          sails.log.info("[CRON] - Found " + count + " items in DCP");
          sails.log.info('[CRON] - Updating DCP.');
          fs.readFile('data/DICCIONARIO_DCP.xml', function (err, data) {
            parser.parseString(data, function (err, data) {
              var index = data.aemps_prescripcion_dcp.dcp;
              var count = 0;
              for (var item in index) {

                if (index.hasOwnProperty(item)) {
                  var codigodcp = index[item].codigodcp.toString();
                  var nombredcp = index[item].nombredcp.toString();
                  Dcp.create({
                    codigodcp: codigodcp,
                    nombredcp: nombredcp
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
