/**
 * PrescripcionExcipientes.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: http://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    prescripcion:{
      model:'prescripcion'
    },
    excipiente: {
      model: 'excipientes'
    }

  },

};

