/**
 * LaboratorioController
 *
 * @description :: Server-side logic for managing Laboratorios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function(req, res){
    laboratorioUtil.update().then(function(){sails.log.info('[CRON] - Finished updating Laboratorio.')}).catch(function(err){sails.log.error('[ERROR] - '+err)})
  }
};

