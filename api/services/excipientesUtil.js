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
    sails.log.info('[CRON] - Destroying Excipientes Collection.');
    Excipientes.destroy().exec(function (err) {
      if (err) {
        sails.log.error("[CRON] - Error while destroying Excipientes.");
        reject();
      }
      else {
        sails.log.info('[CRON] - Updating Excipientes.');
        var stream = fs.createReadStream('data/DICCIONARIO_EXCIPIENTES_DECL_OBLIGATORIA.xml');
        var xml = new XmlStream(stream);
        xml.collect('excipientes');
        xml.on('endElement: excipientes', function (item) {
          xml.pause();
          Excipientes.create(item).exec(function (err, data) {
            if (err) reject(err);
            else {
              xml.resume();
            }
          })
        });
        xml.on('end', function () {
          sails.log.info("[CRON] - Finished updating Excipientes.");
          resolve();
        });




        // fs.readFile('data/DICCIONARIO_EXCIPIENTES_DECL_OBLIGATORIA.xml', function (err, data) {
        //   parser.parseString(data, function (err, data) {
        //     var index = data.aemps_prescripcion_excipientes.excipientes;
        //     var count = 0;
        //     for (var item in index) {
        //       if (index.hasOwnProperty(item)) {
        //         var codigoedo = index[item].codigoedo.toString();
        //         var edo = index[item].edo.toString();
        //         Excipientes.create({
        //           cod_excipiente: codigoedo,
        //           edo: edo
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
