/**
 * VAdmonController
 *
 * @description :: Server-side logic for managing Vadmons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  test: function(req, res){
    res.ok();
    vadmonUtil.update();
  }
};

