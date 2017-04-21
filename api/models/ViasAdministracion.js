/**
 * Vadmon.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'number',
      required: true,
    },
    codigoviaadministracion: {
      type: 'number'
    },
    viaadministracion: {
      type:'string'
    },
    prescripciones:{
      collection: 'prescripcion',
      via: 'via_administracion',
      through: 'prescripcionviaadministracion'
    }
  }
};

