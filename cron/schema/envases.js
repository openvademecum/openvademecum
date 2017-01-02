const Waterline = require('waterline');
var Envases = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'envases',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    codigoenvase: {
      type:'integer',
      unique: true
    },
    envase: {
      type:'string'
    }
  }
});

module.exports = Envases;
