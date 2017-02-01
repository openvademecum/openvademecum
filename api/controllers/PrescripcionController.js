/**
 * PrescripcionController
 *
 * @description :: Server-side logic for managing prescripcions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const fs = require('fs');
const XmlStream = require('xml-stream');
const nodemailer = require('@nodemailer/pro');
const request = require('request');
const unzip = require('unzip');
const fstream = require('fstream');
var now = Date.now();
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

var ok = {
  from: '"OpenVademecum?" <hello@openvademecum.es>', // sender address
  to: 'alejandro.gon.per@gmail.com', // list of receivers
  subject: 'Cron finished', // Subject line
  text: 'The update was correct so far.' // plain text body
};

var ko = {
  from: '"OpenVademecum?" <hello@openvademecum.es>', // sender address
  to: 'alejandro.gon.per@gmail.com', // list of receivers
  subject: 'Cron errored', // Subject line
  text: 'The update failed.' // plain text body
};

module.exports = {
  update: function(req, res){


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
            sails.log.info(" > Element"+ item);
            xml.pause();
            sails.log.info(" > Pause");
            Prescripcion.create(item).exec(function (err, data) {
              if (err) reject(err);
              else {
                sails.log.info(" > Resume <");
                global.gc();
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


    // sails.log.warn("MEMUSAGE -> "+JSON.stringify(JSON.stringify(process.memoryUsage())));
    // pullUtil.pull().then(function () {
    //   sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
    //   global.gc();
    //   sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
    //   atcUtil.update().then(function () {
    //     sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
    //     global.gc();
    //     sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
    //     dcpUtil.update().then(function () {
    //       sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
    //       global.gc();
    //       sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
    //       dcpfUtil.update().then(function () {
    //         sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
    //         global.gc();
    //         sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
    //         dcsaUtil.update().then(function () {
    //           sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
    //           global.gc();
    //           sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
    //           envasesUtil.update().then(function () {
    //             sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
    //             global.gc();
    //             sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
    //             excipientesUtil.update().then(function () {
    //               sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
    //               global.gc();
    //               sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
    //               ffarmaceuticasimpUtil.update().then(function () {
    //                 sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
    //                 global.gc();
    //                 sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
    //                 ffarmaceuticaUtil.update().then(function () {
    //                   sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
    //                   global.gc();
    //                   sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
    //                   laboratorioUtil.update().then(function () {
    //                     sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
    //                     global.gc();
    //                     sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
    //                     pactivosUtil.update().then(function () {
    //                       sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
    //                       global.gc();
    //                       sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
    //                       sitregistroUtil.update().then(function () {
    //                         sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
    //                         global.gc();
    //                         sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
    //                         unicontUtil.update().then(function () {
    //                           sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
    //                           global.gc();
    //                           sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
    //                           vadmonUtil.update().then(function () {
    //                             sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
    //                             global.gc();
    //                             sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
    //                             prescripcionUtil.update().then(function () {
    //                               sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
    //                               global.gc();
    //                               sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
    //                               sendOkMail();
    //                             }).catch(function (err) {sendErrorMail(err)});
    //                           }).catch(function (err) {sendErrorMail(err)});
    //                         }).catch(function (err) {sendErrorMail(err)});
    //                       }).catch(function (err) {sendErrorMail(err)});
    //                     }).catch(function (err) {sendErrorMail(err)});
    //                   }).catch(function (err) {sendErrorMail(err)});
    //                 }).catch(function (err) {sendErrorMail(err)});
    //               }).catch(function (err) {sendErrorMail(err)});
    //             }).catch(function (err) {sendErrorMail(err)});
    //           }).catch(function (err) {sendErrorMail(err)});
    //         }).catch(function (err) {sendErrorMail(err)});
    //       }).catch(function (err) {sendErrorMail(err)});
    //     }).catch(function (err) {sendErrorMail(err)});
    //   }).catch(function (err) {sendErrorMail(err)});
    // }).catch(function (err) {sendErrorMail(err)});
  },

  pull: function(req, res){
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
  }

};

function sendErrorMail(err) {
  sails.log.error('[ERROR] - ' + err);
  transporter.sendMail(ko, function (error, info) {
    if (error) {
      return console.log(error);
    }
    sails.log.info('Message %s sent: %s', info.messageId, info.response);
  });
}

function sendOkMail(){
  transporter.sendMail(ok, function (error, info) {
    if (error) {
      return console.log(error);
    }
    sails.log.info('Message %s sent: %s', info.messageId, info.response);
  });
}

