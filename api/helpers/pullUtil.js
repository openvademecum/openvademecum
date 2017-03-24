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

const now = Date.now();


module.exports = {

  friendlyName: 'Pulling helper',
  description: 'Pulls data and unzips it form AEMPS.',
  sync: true, // See the `Synchronous helpers` documentation later in this document
  inputs: {},

  fn: function (inputs, exits) {
    sails.log.info('[CRON] - Pulling new data from AEMPS');
    request('http://listadomedicamentos.aemps.gob.es/prescripcion.zip')
      .pipe(fs.createWriteStream(now + '.zip'))
      .on('close', function () {
        sails.log.info('[CRON] - Downloaded new data, timestamp: ' + now);
        const readStream = fstream.Reader(now + '.zip');
        const writeStream = fstream.Writer('data/');
        readStream.pipe(unzip.Parse()).pipe(writeStream).on('close', function () {
          sails.log.info('[CRON] - Unzipped to folder, timestamp: ' + now);
          fs.unlink(now + '.zip', function (err) {
            if (err) {
              sails.log.error('[CRON] - Error while unziping: ' + err);
              return exits.error(err);
            }
            sails.log.info('[CRON] - Successfully cleaned.');
            return exits.success('Done');
          });
        });
      });
  }

};
