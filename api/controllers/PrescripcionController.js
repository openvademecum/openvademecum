/**
 * PrescripcionController
 *
 * @description :: Server-side logic for managing prescripcions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

  loadPrescription: function(req, res) {
    // res.ok();
    // excipientesUtil.update().then(function(){
    //   vadmonUtil.update().then(function(){
    //     atcUtil.update().then(function(){
    //       prescripcionUtil.update();
    //     }).catch(function(error){
    //       sails.log.error("ERROR :"+error);
    //     })
    //   })
    // });

    //excipientesUtil.update();
    //pullUtil.pull();

    sails.helpers.prescripcionHelper().exec(function(err, result) {
      if (err) { /*...handle error and return...*/ return res.serverError(err); }
      /* ...process result... */
      sails.log('Ok it worked!  The result is:', result);
      return res.ok();
    });
  }
};

