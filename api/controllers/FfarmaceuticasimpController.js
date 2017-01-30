/**
 * FfarmaceuticasimpController
 *
 * @description :: Server-side logic for managing Ffarmaceuticasimps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function(req, res){
    ffarmaceuticasimpUtil.update().then(function(){sails.log.info('[CRON] - Finished updating Ffarmaceuticasimp.')}).catch(function(err){sails.log.error('[ERROR] - '+err)})
  }
};

