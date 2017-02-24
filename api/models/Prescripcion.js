/**
 * Prescripcion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      unique: true
    },
    cod_nacion: {
      type:'integer',
      unique: true,
      primaryKey: true
    },
    nro_definitivo: {type:'string'},
    des_nomco: {type:'string'},
    des_prese: {type:'string'},
    cod_dcsa: {
      model:'dcsa'
    },
    cod_dcp: {
      model:'dcp'
    },
    cod_dcpf: {
      model:'dcpf'
    },
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
      model:'laboratorio'
    },
    laboratorio_comercializador: {
      model:'laboratorio'
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
  }
};

