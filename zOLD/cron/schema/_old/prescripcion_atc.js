const Waterline = require('waterline');
var Prescripcion_atc = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'prescripcion_atc',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    cod_atc: {type:'string'},
    interacciones_atc:{
      collection: 'prescripcion_int_atc',
      via: 'atc_interaccion'
    },
    desaconsejados_geriatria:{
      collection: 'prescripcion_des_ger',
      via: 'prescripcion_atc'

    },
    duplicidades: {
      collection: 'prescripcion_dup',
      via: 'prescripcion_atc'
    },
    prescripcion: {
      model: 'prescripcion'
    }
  },
  updateOrCreate: function(criteria, values, cb){
    var self = this; // reference for use by callbacks
    // If no values were specified, use criteria
    if (!values) values = criteria.where ? criteria.where : criteria;
    self.findOne(criteria, function (err, result){
      if(err) return cb(err);
      if(result){
        self.update(criteria, values).exec(function (err, res){
          if (err) return cb(err);
          cb(null, res);
        });
      }else{
        self.create(values).exec(function (err, res){
          if (err) return cb(err);
          cb(null, res);
        });
      }
    });
  }

});

module.exports = Prescripcion_atc;
