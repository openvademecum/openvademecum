/**
 * PrescripcionController
 *
 * @description :: Server-side logic for managing prescripcions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function(req, res){
    prescripcionUtil.update().then(function(){sails.log.info('[CRON] - Finished updating Prescripcion.')}).catch(function(err){sails.log.error('[ERROR] - '+err)})
  }
};

