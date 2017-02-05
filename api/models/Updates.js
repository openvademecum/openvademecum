/**
 * Updates.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    model: {
      type:'string'
    },
    old_item: {
      type:'json'
    },
    new_item: {
      type:'json'
    },
    inserted:{
      type:'boolean'
    },
    updated:{
      type:'boolean'
    },
    deleted:{
      type: 'boolean'
    }
  }
};

