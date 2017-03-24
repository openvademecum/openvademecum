/**
 * Dcpf.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',
  attributes: {
    codigodcpf: {
      type: 'number',
      unique: true
    },
    nombredcpf: {
      type:'string'
    },
    nombrecortodcpf: {
      type:'string'
    },
    codigodcp: {
      model:'dcp'
    }
  }
};

