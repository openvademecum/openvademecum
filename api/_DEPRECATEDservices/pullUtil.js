/**
 * Pull Services
 *
 * @description ::
 * @author      :: Alejandro González - algope@github
 * @licence     ::
 *
 */

const fs = require('fs');
const request = require('request');
const unzip = require('unzip');
const fstream = require('fstream');

var now = Date.now();

module.exports.pull = function () {
  return new Promise(function (resolve, reject) {
    sails.log.info('[CRON] - Pulling new data from AEMPS');
    request('http://listadomedicamentos.aemps.gob.es/prescripcion.zip')
      .pipe(fs.createWriteStream(now + '.zip'))
      .on('close', function () {
        sails.log.info('[CRON] - Downloaded new data, timestamp: ' + now);
        var readStream = fstream.Reader(now + '.zip');
        var writeStream = fstream.Writer('data/');
        readStream.pipe(unzip.Parse()).pipe(writeStream).on('close', function () {
          sails.log.info('[CRON] - Unzipped to folder, timestamp: ' + now);
          fs.unlink(now + '.zip', function (err) {
            if (err){
              sails.log.error("[CRON] - Error while unziping: " + err);
              reject(err);
            }
            sails.log.info('[CRON] - Successfully cleaned.');
            resolve();
          })
        })
      })
  });
};
