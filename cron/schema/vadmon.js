const Waterline = require('waterline');
var Vadmon = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'vadmon',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    codigoviaadministracion: {
      type:'integer',
      unique: true
    },
    viaadministracion: {
      type:'string'
    }
  }
});

module.exports = Vadmon;
