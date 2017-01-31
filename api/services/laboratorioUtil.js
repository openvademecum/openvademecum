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
    sails.log.info('[CRON] - Destroying Laboratorio Collection.');
    Laboratorio.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Laboratorio.");
        reject();
      }
      else {
        Laboratorio.count().exec(function (error, count) {
          sails.log.info("[CRON] - Found " + count + " items in Laboratorio");
          sails.log.info('[CRON] - Updating Laboratorio.');
          fs.readFile('data/DICCIONARIO_LABORATORIOS.xml', function (err, data) {
            parser.parseString(data, function (err, data) {
              var index = data.aemps_prescripcion_laboratorios.laboratorios;
              var count = 0;
              for (var item in index) {
                if (index.hasOwnProperty(item)) {
                  var codigolaboratorio = index[item].codigolaboratorio.toString();
                  var laboratorio = index[item].laboratorio.toString();
                  var direccion = index[item].direccion.toString();
                  var codigopostal = index[item].codigopostal || null;
                  var localidad = index[item].localidad || null;
                  Laboratorio.create({
                    codigolaboratorio: codigolaboratorio,
                    laboratorio: laboratorio,
                    direccion: direccion,
                    codigopostal: codigopostal,
                    localidad: localidad
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
