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
    schedule: '0 * * * *',
    onTick: function () {
      pullUtil.pull().then(function () {
        atcUtil.update().then(function () {
          dcpUtil.update().then(function () {
            dcpfUtil.update().then(function () {
              dcsaUtil.update().then(function () {
                envasesUtil.update().then(function () {
                  excipientesUtil.update().then(function () {
                    ffarmaceuticasimpUtil.update().then(function () {
                      ffarmaceuticaUtil.update().then(function () {
                        laboratorioUtil.update().then(function () {
                          pactivosUtil.update().then(function () {
                            sitregistroUtil.update().then(function () {
                              unicontUtil.update().then(function () {
                                vadmonUtil.update().then(function () {
                                  prescripcionUtil.update().then(function () {
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
