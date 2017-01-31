/**
 * UniContController
 *
 * @description :: Server-side logic for managing Uniconts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function(req, res){
    unicontUtil.update().then(function(){sails.log.info('[CRON] - Finished updating Unicont.')}).catch(function(err){sails.log.error('[ERROR] - '+err)})
  }
};

