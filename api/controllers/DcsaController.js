/**
 * DcsaController
 *
 * @description :: Server-side logic for managing dcsas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function(req, res){
    dcsaUtil.update().then(function(){sails.log.info('[CRON] - Finished updating DCSA.')}).catch(function(err){sails.log.error('[ERROR] - '+err)})
  }
};

