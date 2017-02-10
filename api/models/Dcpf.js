/**
 * Dcpf.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true
    },
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
      model:'dcp'
    }
  }
};

