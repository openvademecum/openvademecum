/**
 * Excipientes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true
    },
    codigoedo: {
      type:'integer',
      unique: true
    },
    edo: {
      type:'string'
    },

    prescripciones:{
      collection: 'prescripcion',
      via: 'formasfarmaceuticas_excipientes'
    }
  },
  migrate: 'safe'
};
