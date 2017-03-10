/**
 * PrescripcionController
 *
 * @description :: Server-side logic for managing prescripcions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

  test: function(req, res) {
    res.ok();
    excipientesUtil.update().then(function(){
      vadmonUtil.update().then(function(){
        prescripcionUtil.update();
      })
    });

    //excipientesUtil.update();
    //pullUtil.pull();
  }
};

