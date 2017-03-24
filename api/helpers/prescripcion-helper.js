/**
 * Update Services
 *
 * @description :: Server-side helper function.
 * @help        :: See http://sailsjs.com/docs/concepts/helpers
 * @author      :: Alejandro González - algope@github
 * @licence     ::
 *
 */

const fs = require('fs');
//const _ = require('lodash');
const XmlStream = require('xml-stream');
//const heapdump = require('heapdump');
const flatten = require('flat');


/******************Model Variables**********************/
const itemName = 'prescription';
const modelName = 'prescripcion';
const itemIdName = 'cod_nacion';
const xmlFile = 'data/Prescripcion.xml';
const endCollection = 'aemps_prescripcion';
/************************END*****************************/



module.exports = {

  friendlyName: 'Prescription Helper',


  description: 'Retrieves and updates the Prescription database',


  sync: true, // See the `Synchronous helpers` documentation later in this document


  inputs: {

    //name: {
    //  type: 'string',
    //  description: 'The name of the person to greet.',
    //  required: true
    //}

  },


  fn: function (inputs, exits) {


    // let insertedIds = [];
    // let updatedIds = [];
    // let allIds = [];
    // let ids = [];

    sails.log.info('[CRON] - [Prescripcion] - Updating Prescipcion...');

    const stream = fs.createReadStream(xmlFile);
    const xml = new XmlStream(stream);
    xml.collect('composicion_pa');
    xml.collect('duplicidades');
    xml.collect('excipientes');
    xml.collect('interacciones_atc');
    xml.collect('desaconsejados_geriatria');
    xml.collect('viasadministracion');
    xml.collect('notaseguridad');
    //xml.collect('formasfarmaceuticas');
    xml.on('endElement: ' + itemName, function (item) {
      xml.pause();
      let ID = item.cod_nacion;
      let flat_item = flatten(item, {safe: true, delimiter: '_'});
      flat_item.id = ID;

      let composicion_pa = [];
      if (flat_item.hasOwnProperty('formasfarmaceuticas_composicion_pa')) {
        composicion_pa = flat_item.formasfarmaceuticas_composicion_pa;
        delete flat_item.formasfarmaceuticas_composicion_pa;
      }

      let excipientes = [];
      if (flat_item.hasOwnProperty('formasfarmaceuticas_excipientes')) {
        excipientes = flat_item.formasfarmaceuticas_excipientes;
        delete flat_item.formasfarmaceuticas_excipientes;
      }

      let vias_administracion = [];
      if (flat_item.hasOwnProperty('formasfarmaceuticas_viasadministracion')) {
        vias_administracion = flat_item.formasfarmaceuticas_viasadministracion;
        delete flat_item.formasfarmaceuticas_viasadministracion;
      }

      let atc_interacciones_atc = [];
      if (flat_item.hasOwnProperty('atc_interacciones_atc')) {
        atc_interacciones_atc = flat_item.atc_interacciones_atc;
        delete flat_item.atc_interacciones_atc;
      }

      let atc_duplicidades = [];
      if (flat_item.hasOwnProperty('atc_duplicidades')) {
        atc_duplicidades = flat_item.atc_duplicidades;
        delete flat_item.atc_duplicidades;
      }

      let atc_desaconsejados_geriatria = [];
      if (flat_item.hasOwnProperty('atc_desaconsejados_geriatria')) {
        atc_desaconsejados_geriatria = flat_item.atc_desaconsejados_geriatria;
        delete flat_item.atc_desaconsejados_geriatria;
      }

      let notaseguridad = [];
      if (flat_item.hasOwnProperty('notaseguridad')) {
        atc_desaconsejados_geriatria = flat_item.notaseguridad;
        delete flat_item.notaseguridad;
      }


      Prescripcion.create(flat_item).exec(function (err, created) {
        if (err){
          sails.log.error('[Prescripcion] - Error creating: ' + err);
        }
        else {
          created.formasfarmaceuticas_composicion_pa.add(composicion_pa);
          created.atc_interacciones_atc.add(atc_interacciones_atc);
          created.atc_duplicidades.add(atc_duplicidades);
          created.atc_desaconsejados_geriatria.add(atc_desaconsejados_geriatria);
          created.notaseguridad.add(notaseguridad);
          addExcipientes(excipientes).then(function (ids) {
            created.formasfarmaceuticas_excipientes.add(ids);

            addViasAdmon(vias_administracion).then(function (ids) {
              created.formasfarmaceuticas_viasadministracion.add(ids);
            }).then(function () {
              created.save(function (err) {
                if (err) {
                  sails.log.error('[Prescripcion] - Saving collections ERROR: ' + JSON.stringify(err));
                  sails.log.info('Prescription ID: ' + flat_item.id);
                  sails.log.info('Full Prescription: ' + JSON.stringify(flat_item));
                }
                else {
                  xml.resume();
                }
              });
            });
          });
        }
      });
    });
    xml.on('endElement: ' + endCollection, function () {
      return exits.success('Done');
    });
  }

};




function addViasAdmon(vias) {
  return new Promise(function (resolve, reject) {
    let vadmon_ids = [];
    vias.forEach(function (vadmon) {
      vadmon_ids.push(vadmon.cod_via_admin);
    });
    return resolve(vadmon_ids);
  });
}

function addExcipientes(excipis) {
  return new Promise(function (resolve, reject) {
    let excip_ids = [];
    excipis.forEach(function (excip) {
      excip_ids.push(excip.cod_excipiente);
    });
    return resolve(excip_ids);
  });
}

