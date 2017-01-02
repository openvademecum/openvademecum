const Waterline = require('waterline');
var Ffarmaceuticasimp = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'ffarmaceuticasimp',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    codigoformafarmaceuticasimplificada: {
      type:'integer',
      unique: true
    },
    formafarmaceuticasimplificada: {
      type:'string'
    }
  }
});

module.exports = Ffarmaceuticasimp;
