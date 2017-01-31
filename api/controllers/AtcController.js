/**
 * AtcController
 *
 * @description :: Server-side logic for managing atcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


const nodemailer = require('@nodemailer/pro');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alejandro@hubcivico.org',
    pass: 'igyxycvntuvbztts'
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
    transporter.sendMail(ok, function(error, info) {
      if (error) {
        return console.log(error);
      }
      sails.log.info('Message %s sent: %s', info.messageId, info.response);
    });
  }
};

