/**
 * Interacciones_atc.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    atc_interaccion:'string',
    descripcion_atc_interaccion:'string',
    efecto_interaccion:'string',
    recomendacion_interaccion: 'string',
    prescripcion:{
      model: 'prescripcion'
    }

  }
};

