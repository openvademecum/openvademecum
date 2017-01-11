const Waterline = require('waterline');
var Prescripcion = Waterline.Collection.extend({

  // Identity is a unique name for this model and must be in lower case
  identity: 'prescripcion',

  // Connection
  // A named connection which will be used to read/write to the datastore
  connection: 'default',

  // Attributes are basic pieces of information about a model
  attributes: {
    cod_nacion: {
      type:'integer',
      unique: true
    },
    nro_definitivo: {
      type:'integer',
      unique: true
    },
    des_nomco: {type:'string'},
    des_prese: {type:'string'},
    cod_dcsa: {type:'integer'},
    cod_dcp: {type:'integer'},
    cod_dcpf: {type:'integer'},
    des_dosific: {type:'string'},
    cod_envase: {
      model:'envases'
    },
    contenido: {type:'integer'},
    unid_contenido: {
      model:'unicont'
    },
    nro_conte: {type:'string'},
    sw_psicotropo: {type:'integer'},
    sw_estupefaciente: {type:'integer'},
    sw_afecta_conduccion: {type:'integer'},
    sw_triangulo_negro: {type:'integer'},
    url_fictec: {type:'string'},
    url_prosp: {type:'string'},
    sw_receta: {type:'integer'},
    sw_generico: {type:'integer'},
    sw_sustituible: {type:'integer'},
    sw_envase_clinico: {type:'integer'},
    sw_uso_hospitalario: {type:'integer'},
    sw_diagnostico_hospitalario: {type:'integer'},
    sw_tld: {type:'integer'},
    sw_especial_control_medico: {type:'integer'},
    sw_huerfano: {type:'integer'},
    sw_base_a_plantas: {type:'integer'},
    laboratorio_titular: {
      model: 'laboratorio'
    },
    laboratorio_comercializador: {
      model: 'laboratorio'
    },
    fecha_autorizacion: {type:'date'},
    sw_comercializado: {type:'integer'},
    fec_comer: {type:'date'},
    cod_sitreg: {
      model:'sitregistro'
    },
    cod_sitreg_presen: {
      model:'sitregistro'
    },
    fecha_situacion_registro: {type:'date'},
    fec_sitreg_presen: {type:'date'},
    sw_tiene_excipientes_decl_obligatoria: {type:'integer'},
    biosimilar: {type:'integer'},
    importacion_paralela: {type:'integer'}
    //,
    // formasfarmaceuticas: {
    //   model: 'prescripcion_for_far'
    // },
    // atc: {
    //   collection: 'prescripcion_atc',
    //   via: 'prescripcion'
    // }
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

module.exports = Prescripcion;
