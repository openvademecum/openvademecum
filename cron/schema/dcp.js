const Waterline = require('waterline');
var Dcp = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'dcp',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    codigodcp: {
      type:'integer',
      unique: true
    },
    nombredcp: {
      type:'string'
    }
  }
});

module.exports = Dcp;
