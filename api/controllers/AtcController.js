/**
 * AtcController
 *
 * @description :: Server-side logic for managing atcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {
  test: function(req, res){
    res.ok();
    atcUtil.update(function(err, res){
      if (err)  sails.log.error("[ATC] - Error while updating ATC");
      else if (res){
        sails.log.info("[ATC] - Finished updating ATC.");
      }
    })
  }

};

