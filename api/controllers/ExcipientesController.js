/**
 * ExcipientesController
 *
 * @description :: Server-side logic for managing excipientes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function(req, res){
    excipientesUtil.update().then(function(){sails.log.info('[CRON] - Finished updating Excipientes.')}).catch(function(err){sails.log.error('[ERROR] - '+err)})
  }
};

