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
const xml2js = require('xml2js');
const path = require("path");
const jsonfile = require('jsonfile');

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
            if (err) {
              sails.log.error("[CRON] - Error while unziping: " + err);
              reject(err);
            }
            sails.log.info('[CRON] - Successfully cleaned.');
            sails.log.info('[CRON] - Converting to JSON');
            var p = 'data/';
            fs.readdir(p, function (err, files) {
              if (err) {
                sails.log.error("[CRON] - Error " + err);
                reject(err);
              }
              files.map(function (file) {
                return path.join(p, file);
              }).filter(function (file) {
                return fs.statSync(file).isFile() && path.extname(file) === '.xml';
              }).forEach(function (file) {
                var parser = new xml2js.Parser({explicitArray: false});
                console.log("%s (%s)", file, path.extname(file));
                var data = fs.readFileSync(file);
                parser.parseString(data, function (err, data) {
                  var fileNameSplit = file.split('.');
                  var fileNameName = fileNameSplit[0];
                  var fileName = fileNameName + '.json';
                  jsonfile.writeFileSync(fileName, data);
                  fs.unlink(file, function (err) {
                    if (err) {
                      sails.log.error("[CRON] - Error while unziping: " + err);
                      reject(err);
                    }
                  })
                })

              });
              sails.log.info("[CRON] - JOB FINISHED!!!!!!");
              resolve();
            });
          })
        })
      })
  });
};
