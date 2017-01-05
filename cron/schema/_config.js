const sailsMemoryAdapter = require('sails-memory');
const sailsMongoAdapter = require('sails-mongo')

var config = {
  adapters: {
    'memory': sailsMemoryAdapter,
    'mongo' : sailsMongoAdapter
  },

  connections: {
    default: {
      adapter: 'mongo',
      url: process.env.MONGODB_URI
    }
  }
};
module.exports = config;
