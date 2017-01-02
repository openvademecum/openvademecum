const Waterline = require('waterline');
var Dcsa = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'dcsa',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    codigodcsa: {
      type:'integer',
      unique: true
    },
    nombredcsa: {
      type:'string'
    }
  }
});

module.exports = Dcsa;
