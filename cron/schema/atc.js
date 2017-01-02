const Waterline = require('waterline');
var Atc = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'atc',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    nroatc: {
      type:'integer',
      unique: true
    },
    codigoatc: {
      type:'string',
      unique: true
    },
    descatc: {
      type:'string',
      unique: true
    }
  }
});

module.exports = Atc;
