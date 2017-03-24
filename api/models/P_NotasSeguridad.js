/**
 * P_NotasSeguridad.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    numero_nota_seguridad: 'string',
    referencia_nota_seguridad: 'string',
    asunto_nota_seguridad: 'string',
    fecha_nota_seguridad: { type: 'string', columnType: 'date' },
    url_nota_seguridad: 'string',
    prescripcion: {
      model: 'prescripcion'
    }
  }
};

