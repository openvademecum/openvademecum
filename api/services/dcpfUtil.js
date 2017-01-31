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
    sails.log.info('[CRON] - Destroying DCPF Collection.');
    Dcpf.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying DCPF.");
        reject();
      }
      else {
        Dcpf.count().exec(function (error, count) {
          sails.log.info("[CRON] - Found " + count + " items in DCPF");
          sails.log.info('[CRON] - Updating DCPF.');
          fs.readFile('data/DICCIONARIO_DCPF.xml', function (err, data) {
            parser.parseString(data, function (err, data) {
              var index = data.aemps_prescripcion_dcpf.dcpf;
              var count = 0;
              for (var item in index) {
                if (index.hasOwnProperty(item)) {
                  var codigodcpf = index[item].codigodcpf.toString();
                  var nombredcpf = index[item].nombredcpf.toString();
                  var nombrecortodcpf = index[item].nombrecortodcpf.toString();
                  var codigodcp = index[item].codigodcp.toString();
                  Dcpf.create({
                    codigodcpf: codigodcpf,
                    nombredcpf: nombredcpf,
                    nombrecortodcpf: nombrecortodcpf,
                    codigodcp: codigodcp
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
