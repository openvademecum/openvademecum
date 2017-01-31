/**
 * SitRegistroController
 *
 * @description :: Server-side logic for managing Sitregistroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function(req, res){
    sitregistroUtil.update().then(function(){sails.log.info('[CRON] - Finished updating Sitregistro.')}).catch(function(err){sails.log.error('[ERROR] - '+err)})
  }
};

