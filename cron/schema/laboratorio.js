const Waterline = require('waterline');
var Laboratorio = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'laboratorio',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
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
      type:'integer'
    },
    localidad: {
      type:'string'
    }
  }
});

module.exports = Laboratorio;
