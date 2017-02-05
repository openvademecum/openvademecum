/**
 * PrescripcionController
 *
 * @description :: Server-side logic for managing prescripcions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


const nodemailer = require('@nodemailer/pro');
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
    sails.log.warn("MEMUSAGE -> "+JSON.stringify(JSON.stringify(process.memoryUsage())));
    pullUtil.pull().then(function () {
      sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
      global.gc();
      sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
      atcUtil.update().then(function () {
        sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
        global.gc();
        sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
        dcpUtil.update().then(function () {
          sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
          global.gc();
          sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
          dcpfUtil.update().then(function () {
            sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
            global.gc();
            sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
            dcsaUtil.update().then(function () {
              sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
              global.gc();
              sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
              envasesUtil.update().then(function () {
                sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
                global.gc();
                sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
                excipientesUtil.update().then(function () {
                  sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
                  global.gc();
                  sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
                  ffarmaceuticasimpUtil.update().then(function () {
                    sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
                    global.gc();
                    sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
                    ffarmaceuticaUtil.update().then(function () {
                      sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
                      global.gc();
                      sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
                      laboratorioUtil.update().then(function () {
                        sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
                        global.gc();
                        sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
                        pactivosUtil.update().then(function () {
                          sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
                          global.gc();
                          sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
                          sitregistroUtil.update().then(function () {
                            sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
                            global.gc();
                            sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
                            unicontUtil.update().then(function () {
                              sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
                              global.gc();
                              sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
                              vadmonUtil.update().then(function () {
                                sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
                                global.gc();
                                sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
                                prescripcionUtil.update().then(function () {
                                  sails.log.warn("MEMUSAGE -> "+JSON.stringify(process.memoryUsage()));
                                  global.gc();
                                  sails.log.warn("MEMUSAGE AFTER GC -> "+JSON.stringify(process.memoryUsage()));
                                  sendOkMail();
                                }).catch(function (err) {sendErrorMail(err)});
                              }).catch(function (err) {sendErrorMail(err)});
                            }).catch(function (err) {sendErrorMail(err)});
                          }).catch(function (err) {sendErrorMail(err)});
                        }).catch(function (err) {sendErrorMail(err)});
                      }).catch(function (err) {sendErrorMail(err)});
                    }).catch(function (err) {sendErrorMail(err)});
                  }).catch(function (err) {sendErrorMail(err)});
                }).catch(function (err) {sendErrorMail(err)});
              }).catch(function (err) {sendErrorMail(err)});
            }).catch(function (err) {sendErrorMail(err)});
          }).catch(function (err) {sendErrorMail(err)});
        }).catch(function (err) {sendErrorMail(err)});
      }).catch(function (err) {sendErrorMail(err)});
    }).catch(function (err) {sendErrorMail(err)});
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

