const Waterline = require('waterline');
var Dcpf = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'dcpf',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    codigodcpf: {
      type:'integer',
      unique: true
    },
    nombredcpf: {
      type:'string'
    },
    nombrecortodcpf: {
      type:'string'
    },
    codigodcp: {
      type:'integer'
    }
  }
});

module.exports = Dcpf;
