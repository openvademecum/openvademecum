/**
 * VAdmonController
 *
 * @description :: Server-side logic for managing Vadmons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function(req, res){
    vadmonUtil.update().then(function(){sails.log.info('[CRON] - Finished updating Vadmon.')}).catch(function(err){sails.log.error('[ERROR] - '+err)})
  }
};

