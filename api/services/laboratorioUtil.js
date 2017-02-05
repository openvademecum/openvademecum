/**
 * Update Services
 *
 * @description ::
 * @author      :: Alejandro González - algope@github
 * @licence     ::
 *
 */

const fs = require('fs');
const XmlStream = require('xml-stream');

module.exports.update = function () {

  return new Promise(function (resolve, reject) {
    sails.log.info('[CRON] - Destroying Laboratorio Collection.');
    Laboratorio.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Laboratorio.");
        reject();
      }
      else {
        sails.log.info('[CRON] - Updating Laboratorio.');
        var stream = fs.createReadStream('data/DICCIONARIO_LABORATORIOS.xml');
        var xml = new XmlStream(stream);
        xml.collect('laboratorios');
        xml.on('endElement: laboratorios', function (item) {
          xml.pause();
          Laboratorio.create(item).exec(function (err, data) {
            if (err) reject(err);
            else {
              xml.resume();
            }
          })
        });
        xml.on('end', function () {
          sails.log.info("[CRON] - Finished updating Laboratorio.");
          resolve();
        });





        // fs.readFile('data/DICCIONARIO_LABORATORIOS.xml', function (err, data) {
        //   parser.parseString(data, function (err, data) {
        //     var index = data.aemps_prescripcion_laboratorios.laboratorios;
        //     var count = 0;
        //     for (var item in index) {
        //       if (index.hasOwnProperty(item)) {
        //         var codigolaboratorio = index[item].codigolaboratorio.toString();
        //         var laboratorio = index[item].laboratorio.toString();
        //         var direccion = index[item].direccion.toString();
        //         var codigopostal = index[item].codigopostal || null;
        //         var localidad = index[item].localidad || null;
        //         Laboratorio.create({
        //           codigolaboratorio: codigolaboratorio,
        //           laboratorio: laboratorio,
        //           direccion: direccion,
        //           codigopostal: codigopostal,
        //           localidad: localidad
        //         }).exec(function (err, data) {
        //           if (err) reject(err);
        //           else {
        //             count++;
        //             if (count == index.length) resolve();
        //           }
        //         })
        //       }
        //     }
        //   })
        // })
      }
    })
  });
};
