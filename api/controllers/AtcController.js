/**
 * AtcController
 *
 * @description :: Server-side logic for managing atcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {
  update: function(req, res){
    atcutil.update().then(function(){sails.log.info('[CRON] - Finished updating ATC.')}).catch(function(err){sails.log.error('[ERROR] - '+err)})

  }

};

