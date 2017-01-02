const Waterline = require('waterline');
var Ffarmaceutica = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'ffarmaceutica',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    codigoformafarmaceutica: {
      type:'integer',
      unique: true
    },
    formafarmaceutica: {
      type:'string'
    },
    codigoformafarmaceuticasimplificada: {
      type:'integer'
    }
  }
});

module.exports = Ffarmaceutica;
