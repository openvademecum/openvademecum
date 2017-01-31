/**
 * PActivosController
 *
 * @description :: Server-side logic for managing Pactivos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function(req, res){
    pactivosUtil.update().then(function(){sails.log.info('[CRON] - Finished updating PActivos.')}).catch(function(err){sails.log.error('[ERROR] - '+err)})
  }
};

