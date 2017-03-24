/**
 * Prescripcion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',

  attributes: {
    cod_nacion: {
      type: 'number'
    },
    nro_definitivo:'string',
    des_nomco: 'string',
    des_prese: 'string',
    cod_dcsa: {model:'dcsa'},
    cod_dcp: {model:'dcp'},
    cod_dcpf: {model:'dcpf'},
    des_dosific: 'string',
    cod_envase: {model:'envases'},
    contenido: { type: 'number'},
    unid_contenido: {model:'unidadescontenido'},
    nro_conte: {type:'string'},
    sw_psicotropo: 'string',
    lista_psicotropo : 'string',
    sw_estupefaciente: 'string',
    lista_estupefaciente: 'string',
    sw_afecta_conduccion: 'string',
    sw_triangulo_negro: 'string',
    url_fictec: 'string',
    url_prosp: 'string',
    sw_receta: 'string',
    sw_generico: 'string',
    sw_sustituible: 'string',
    sw_envase_clinico: 'string',
    sw_uso_hospitalario: 'string',
    sw_diagnostico_hospitalario: {type: 'number'},
    sw_tld: 'string',
    sw_especial_control_medico: 'string',
    sw_huerfano: 'string',
    sw_base_a_plantas: 'string',
    laboratorio_titular: {model:'laboratorios'},
    laboratorio_comercializador: {model:'laboratorios'},
    fecha_autorizacion: { type: 'string', columnType: 'date' },
    sw_comercializado: 'string',
    fec_comer: { type: 'string', columnType: 'date' },
    cod_sitreg: {
      model: 'situacionesregistro'
    },
    cod_sitreg_presen: {
      model: 'situacionesregistro'
    },
    fecha_situacion_registro: { type: 'string', columnType: 'date' },
    fec_sitreg_presen: { type: 'string', columnType: 'date' },
    cod_nacionales_inactivos: { type: 'number'},
    sw_tiene_excipientes_decl_obligatoria: 'string',
    biosimilar: 'string',
    importacion_paralela: 'string',

    /*************** FormasFarmaceuticas ***************/
    formasfarmaceuticas_cod_forfar: { type: 'number'},
    formasfarmaceuticas_cod_forfar_simplificada: { type: 'number'},
    formasfarmaceuticas_nro_pactiv: { type: 'number'},
    formasfarmaceuticas_composicion_pa: {
      collection: 'p_composicionpa',
      via: 'prescripcion'
    },
    formasfarmaceuticas_excipientes: {
      collection: 'excipientes',
      via: 'prescripciones',
      dominant: true
    },
    formasfarmaceuticas_viasadministracion: {
      collection: 'viasadministracion',
      via: 'prescripciones',
      dominant: true
    },

    /****************************** ATC ******************************/
    atc_cod_atc: 'string',
    teratogenia: 'string',
    atc_interacciones_atc: {
      collection: 'p_interacciones',
      via: 'prescripcion'
    },
    atc_duplicidades: {
      collection: 'p_duplicidades',
      via: 'prescripcion'
    },
    atc_desaconsejados_geriatria: {
      collection: 'p_desaconsejadosgeriatria',
      via: 'prescripcion'
    },


    notaseguridad: {
      collection: 'p_notasseguridad',
      via: 'prescripcion'
    }
  }
};

