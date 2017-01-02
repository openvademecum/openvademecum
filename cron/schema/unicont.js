const Waterline = require('waterline');
var Unicont = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'unicont',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    codigounidadcontenido: {
      type:'integer',
      unique: true
    },
    unidadcontenido: {
      type:'string'
    }
  }
});

module.exports = Unicont;
