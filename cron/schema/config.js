const sailsMemoryAdapter = require('sails-memory');

var config = {
    adapters: {
        'memory': sailsMemoryAdapter
    },

    connections: {
        default: {
            adapter: 'memory'
        }
    }
};
module.exports = config;
