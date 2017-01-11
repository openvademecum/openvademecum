const Waterline = require('waterline');
var Prescripcion_com_pa = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'prescripcion_com_pa',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    cod_principio_activo: {type: 'integer'},
    orden_colacion: {type:'integer'},
    dosis_pa: {type:'integer'},
    unidad_dosis_pa: {type:'string'},
    dosis_composicion: {type:'integer'},
    unidad_composicion: {type:'string'},
    dosis_administracion: {type:'integer'},
    unidad_administracion: {type:'string'},
    dosis_prescripcion: {type:'string'},
    unidad_prescripcion: {type:'string'},
    prescripcion_for_far: {
      collection: 'prescripcion_for_far',
      via: 'composicion_pa'
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

module.exports = Prescripcion_com_pa;
