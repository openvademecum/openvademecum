/**
 * AtcController
 *
 * @description :: Server-side logic for managing atcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
  test: function (req, res) {
    sails.helpers.atc().exec(function(err, result) {
      if (err) { /*...handle error and return...*/ return res.serverError(err); }
      /* ...process result... */
      sails.log('Ok it worked!  The result is:', result);
      return res.ok();
    });
  }

};

