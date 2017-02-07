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
module.exports.cron = {
  pull: {
    schedule: '0 */3 * * *', //Every 3 hours.
    onTick: function () {
      pullUtil.pull().then(function () {
        global.gc();
        atcUtil.update().then(function () {
          global.gc();
          dcpUtil.update().then(function () {
            global.gc();
            dcpfUtil.update().then(function () {
              global.gc();
              dcsaUtil.update().then(function () {
                global.gc();
                envasesUtil.update().then(function () {
                  global.gc();
                  excipientesUtil.update().then(function () {
                    global.gc();
                    ffarmaceuticasimpUtil.update().then(function () {
                      global.gc();
                      ffarmaceuticaUtil.update().then(function () {
                        global.gc();
                        laboratorioUtil.update().then(function () {
                          global.gc();
                          pactivosUtil.update().then(function () {
                            global.gc();
                            sitregistroUtil.update().then(function () {
                              global.gc();
                              unicontUtil.update().then(function () {
                                global.gc();
                                vadmonUtil.update().then(function () {
                                  global.gc();
                                  prescripcionUtil.update().then(function () {
                                    global.gc();
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
    },
    start: false,
    timezone: 'Europe/Madrid',
    context: undefined
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
