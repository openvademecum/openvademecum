const Waterline = require('waterline');
var Prescripcion_for_far = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'prescripcion_for_far',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    cod_forfar: {
      model:'ffarmaceutica'
    },
    cod_forfar_simplificada: {
      model:'ffarmaceuticasimp'
    },
    nro_pactiv: {type:'integer'},
    composicion_pa: {
      collection: 'prescripcion_com_pa',
      via: 'cod_principio_activo'
    },
    excipientes: {
      collection: 'excipientes',
      via: 'cod_excipiente'
    },
    viasadministracion: {
      collection: 'vadmon',
      via: 'cod_via_admin'
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

module.exports = Prescripcion_for_far;
