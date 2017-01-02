const Waterline = require('waterline');
var Excipientes = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'excipientes',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    codigoedo: {
      type:'integer',
      unique: true
    },
    edo: {
      type:'string'
    }
  }
});

module.exports = Excipientes;
