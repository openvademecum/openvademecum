/**
 * Laboratorio.js
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
    codigolaboratorio: {
      type:'integer',
      unique: true
    },
    laboratorio: {
      type:'string'
    },
    direccion: {
      type:'string'
    },
    codigopostal: {
      type:'string'
    },
    localidad: {
      type:'string'
    }
  }
};

