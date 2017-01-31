/**
 * DcpController
 *
 * @description :: Server-side logic for managing dcps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function(req, res){
    dcpUtil.update().then(function(){sails.log.info('[CRON] - Finished updating DCP.')}).catch(function(err){sails.log.error('[ERROR] - '+err)})
  }
};

