const Waterline = require('waterline');
var Sitriesgo = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'sitriesgo',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    codigosituacionregistro: {
      type:'integer',
      unique: true
    },
    situacionregistro: {
      type:'string'
    }
  }
});

module.exports = Sitriesgo;
