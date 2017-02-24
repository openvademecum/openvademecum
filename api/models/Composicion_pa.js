/**
 * Composicion_pa.js
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
    cod_principio_activo: {
      type: 'string',
      unique: true,
      primaryKey: true
    },
    orden_colacion: 'int',
    dosis_pa: 'sting',
    unidad_dosis_pa: 'string',
    dosis_composicion: 'string',
    unidad_composicion: 'string',
    dosis_administracion: 'string',
    unidad_administracion: 'string',
    dosis_prescripcion: 'string',
    unidad_prescripcion: 'string',
    prescripcion:{
      model: 'prescripcion'
    }

  }
};

