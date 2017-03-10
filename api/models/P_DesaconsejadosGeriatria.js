/**
 * P_DesaconsejadosGeriatria.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    alerta_geriatria: 'string',
    riesgo_pacience_geriatria: 'string',
    recomendacion_geriatria: 'string',
    prescripcion: {
      model: 'prescripcion'
    }
  }
};

