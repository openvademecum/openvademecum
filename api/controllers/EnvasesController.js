/**
 * EnvasesController
 *
 * @description :: Server-side logic for managing envases
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function(req, res){
    envasesUtil.update().then(function(){sails.log.info('[CRON] - Finished updating Envases.')}).catch(function(err){sails.log.error('[ERROR] - '+err)})
  }
};

