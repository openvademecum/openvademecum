/**
 * P_ComposicionPA.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    cod_principio_activo: 'integer',
    orden_colacion: 'integer',
    dosis_pa: 'integer',
    unidad_dosis_pa: 'string',
    dosis_composicion: 'string',
    unidad_composicion: 'string',
    dosis_administracion: 'integer',
    unidad_administracion: 'string',
    dosis_prescripcion: 'string',
    unidad_prescripcion: 'string',
    cantidad_volumen_unidad_composicion: 'integer',
    unidad_volumen_unidad_composicion: 'string',
    cantidad_volumen_unidad_administracion: 'string',
    unidad_volumen_unidad_administracion: 'string',
    prescripcion:{
      model: 'prescripcion'
    }
  }
};

