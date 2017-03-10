/**
 * Vadmon.js
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
    codigoviaadministracion: {
      type:'integer',
      unique: true
    },
    viaadministracion: {
      type:'string'
    },
    prescripciones:{
      collection: 'prescripcion',
      via: 'formasfarmaceuticas_viasadministracion'
    }
  },
  migrate: 'safe'
};
