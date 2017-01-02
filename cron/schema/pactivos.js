const Waterline = require('waterline');
var Pactivos = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'pactivos',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    nroprincipioactivo: {
      type:'integer',
      unique: true
    },
    codigoprincipioactivo: {
      type:'string'
    },
    principioactivo: {
      type:'string'
    }
  }
});

module.exports = Pactivos;
