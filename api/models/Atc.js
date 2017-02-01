/**
 * Atc.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var _ = require('underscore');

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true
    },
    nroatc: {
      type: 'integer',
      unique: true
    },
    codigoatc: {
      type: 'string',
      unique: true
    },
    descatc: {
      type: 'string'
    }
  },
  autoPK: false
};
