/**
 * Atc.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var _ = require('underscore');

module.exports = {

  attributes: {
    nro_atc: {
      type: 'integer',
      unique: true
    },
    cod_atc: {
      type: 'string',
      unique: true
    },
    desc_atc: {
      type: 'string',
      unique: true
    }
  },
  //TODO: This function is not going to be used in v0.1
  updateOrCreate: function (criteria, values, cb) {
    var self = this;
    if (!values) values = criteria.where ? criteria.where : criteria;

    self.findOne({nro_atc:values.nro_atc}, function (err, result) {
      if (err) return cb(err);
      if (result) {
        delete result.createdAt;
        delete result.updatedAt;
        delete result.id;
        values.nro_atc = parseInt(values.nro_atc, 10);

        var elemIsEqual=_.isMatch(values, result);
        if (!elemIsEqual) {
          sails.log.info("***** IS EQUAL: "+elemIsEqual);
          sails.log.info("***** IS EQUAL NEGATED: "+!elemIsEqual);
          sails.log.warn(">>>>>>>> NOT EQUAL ITEM: ");
          sails.log.warn("OLD: "+JSON.stringify(result));
          sails.log.warn("NEW: "+JSON.stringify(values));
          sails.log.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<");
          Modelupdates.create({
            model: 'atc',
            old_item: result,
            new_item: values,
            updated: true,
            created: false
          }).exec(function (err, res) {
            sails.log.info("[ATC] - Item updated.");
            self.update(criteria, values).exec(function (err, res) {
              if (err) return cb(err);
              cb();
            });
          })
        } else {
          sails.log.info("[ATC] - Item equal.");
        }
      } else {
        Modelupdates.create({
          model: 'atc',
          old_item: result,
          new_item: values,
          updated: false,
          created: true
        }).exec(function (err, res) {
          sails.log.info("[ATC] - Item created.");
          self.create(values).exec(function (err, res) {
            if (err) sails.log.error("[ATC] - Error "+err);
            cb();
          });
        });
      }
    });
  }
};
