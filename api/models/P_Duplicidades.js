/**
 * P_Duplicidades.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    atc_duplicidad: 'string',
    descripcion_atc_duplicidad: 'string',
    efecto_duplicidad: 'string',
    recomendacion_duplicidad: 'string',
    prescripcion: {
      model: 'prescripcion'
    }
  }
};

