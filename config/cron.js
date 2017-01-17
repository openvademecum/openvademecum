const fs = require('fs');
const request = require('request');
const unzip = require('unzip');
const fstream = require('fstream');
const xml2js = require('xml2js');

var now = Date.now();
var parser = new xml2js.Parser({explicitArray: false});

module.exports.cron = {
  pull: {
    schedule: '* * * * *',
    onTick: function () {
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
              if (err) sails.log.error("[CRON] - Error while unziping: " + err);
              sails.log.info('[CRON] - Successfully cleaned.');
            })
          })
        })
    },
    start: false,
    timezone: 'Europe/Madrid',
    context: undefined
  },

  updateATC: {
    schedule: '* * * * *',
    onTick: function () {
      sails.log.info('[CRON] - Updating ATC.');
      fs.readFile('data/DICCIONARIO_ATC.xml', function (err, data) {
        parser.parseString(data, function (err, data) {
          var index = data.aemps_prescripcion_atc.atc;
          for (var item in index) {
            if (index.hasOwnProperty(item)) {
              var nroatc = index[item].nroatc.toString();
              var codigoatc = index[item].codigoatc.toString();
              var descatc = index[item].descatc.toString();
              Atc.updateOrCreate({
                nro_atc: nroatc,
                cod_atc: codigoatc,
                des_catc: descatc
              }, {
                nro_atc: nroatc,
                cod_atc: codigoatc,
                des_catc: descatc
              });
            }
          }
          sails.log.info("[CRON] - Finishing updating ATC.");
        });
      });
    },
    start: true, // Start task immediately
    timezone: 'Europe/Madrid', // Custom timezone
    context: undefined // Custom context for onTick callback

  },
  /*updateATC: {
    schedule: '* * * * *',
    onTick: function () {
      sails.log.info('[CRON] - Pulling new data from AEMPS');
    },
    start: false, // Start task immediately
    timezone: 'Europe/Madrid', // Custom timezone
    context: undefined // Custom context for onTick callback

  },
  updateATC: {
    schedule: '* * * * *',
    onTick: function () {
      sails.log.info('[CRON] - Pulling new data from AEMPS');
    },
    start: false, // Start task immediately
    timezone: 'Europe/Madrid', // Custom timezone
    context: undefined // Custom context for onTick callback

  },
  updateATC: {
    schedule: '* * * * *',
    onTick: function () {
      sails.log.info('[CRON] - Pulling new data from AEMPS');
    },
    start: false, // Start task immediately
    timezone: 'Europe/Madrid', // Custom timezone
    context: undefined // Custom context for onTick callback

  },
  updateATC: {
    schedule: '* * * * *',
    onTick: function () {
      sails.log.info('[CRON] - Pulling new data from AEMPS');
    },
    start: false, // Start task immediately
    timezone: 'Europe/Madrid', // Custom timezone
    context: undefined // Custom context for onTick callback

  },
  updateATC: {
    schedule: '* * * * *',
    onTick: function () {
      sails.log.info('[CRON] - Pulling new data from AEMPS');
    },
    start: false, // Start task immediately
    timezone: 'Europe/Madrid', // Custom timezone
    context: undefined // Custom context for onTick callback

  },
  updateATC: {
    schedule: '* * * * *',
    onTick: function () {
      sails.log.info('[CRON] - Pulling new data from AEMPS');
    },
    start: false, // Start task immediately
    timezone: 'Europe/Madrid', // Custom timezone
    context: undefined // Custom context for onTick callback

  },
  updateATC: {
    schedule: '* * * * *',
    onTick: function () {
      sails.log.info('[CRON] - Pulling new data from AEMPS');
    },
    start: false, // Start task immediately
    timezone: 'Europe/Madrid', // Custom timezone
    context: undefined // Custom context for onTick callback

  },
  updateATC: {
    schedule: '* * * * *',
    onTick: function () {
      sails.log.info('[CRON] - Pulling new data from AEMPS');
    },
    start: false, // Start task immediately
    timezone: 'Europe/Madrid', // Custom timezone
    context: undefined // Custom context for onTick callback

  },
  updateATC: {
    schedule: '* * * * *',
    onTick: function () {
      sails.log.info('[CRON] - Pulling new data from AEMPS');
    },
    start: false, // Start task immediately
    timezone: 'Europe/Madrid', // Custom timezone
    context: undefined // Custom context for onTick callback

  },
  updateATC: {
    schedule: '* * * * *',
    onTick: function () {
      sails.log.info('[CRON] - Pulling new data from AEMPS');
    },
    start: false, // Start task immediately
    timezone: 'Europe/Madrid', // Custom timezone
    context: undefined // Custom context for onTick callback

  },
  updateATC: {
    schedule: '* * * * *',
    onTick: function () {
      sails.log.info('[CRON] - Pulling new data from AEMPS');
    },
    start: false, // Start task immediately
    timezone: 'Europe/Madrid', // Custom timezone
    context: undefined // Custom context for onTick callback

  },
  updateATC: {
    schedule: '* * * * *',
    onTick: function () {
      sails.log.info('[CRON] - Pulling new data from AEMPS');
    },
    start: false, // Start task immediately
    timezone: 'Europe/Madrid', // Custom timezone
    context: undefined // Custom context for onTick callback

  }*/


};
