/**
 * FfarmaceuticaController
 *
 * @description :: Server-side logic for managing Ffarmaceuticas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function(req, res){
    ffarmaceuticaUtil.update().then(function(){sails.log.info('[CRON] - Finished updating Ffarmaceutica.')}).catch(function(err){sails.log.error('[ERROR] - '+err)})
  }
};

