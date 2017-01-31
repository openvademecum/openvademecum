/**
 * DcpfController
 *
 * @description :: Server-side logic for managing dcpfs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function(req, res){
    dcpfUtil.update().then(function(){sails.log.info('[CRON] - Finished updating DCPF.')}).catch(function(err){sails.log.error('[ERROR] - '+err)})
  }
};

