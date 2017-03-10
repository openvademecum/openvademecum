/**
 * Update Services
 *
 * @description ::
 * @author      :: Alejandro González - algope@github
 * @licence     ::
 *
 */

const fs = require('fs');
const _ = require('lodash');
const XmlStream = require('xml-stream');
const heapdump = require('heapdump');
const flatten = require('flat');


/******************Model Variables**********************/
const itemName = 'prescription';
const modelName = 'prescripcion';
const itemIdName = 'cod_nacion';
const xmlFile = 'data/Prescripcion.xml';
const endCollection = 'aemps_prescripcion';
/************************END*****************************/


module.exports.update = function () {
  return new Promise(function (resolve, reject) {

    var insertedIds = [];
    var updatedIds = [];
    var allIds = [];
    var ids = [];

    sails.log.info("[CRON] - [Prescripcion] - Updating Prescipcion...");


    //Get all Collection IDs

    var stream = fs.createReadStream(xmlFile);
    var xml = new XmlStream(stream);
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
      var ID = item.cod_nacion;
      var flat_item = flatten(item, {safe: true, delimiter: "_"});
      flat_item.id=ID;

      var composicion_pa = [];
      if (flat_item.hasOwnProperty('formasfarmaceuticas_composicion_pa')) {
        composicion_pa = flat_item.formasfarmaceuticas_composicion_pa;
        delete flat_item.formasfarmaceuticas_composicion_pa;
      }

      var excipientes = [];
      if (flat_item.hasOwnProperty('formasfarmaceuticas_excipientes')) {
        excipientes = flat_item.formasfarmaceuticas_excipientes;
        delete flat_item.formasfarmaceuticas_excipientes;
      }

      var vias_administracion = [];
      if (flat_item.hasOwnProperty('formasfarmaceuticas_viasadministracion')) {
        vias_administracion = flat_item.formasfarmaceuticas_viasadministracion;
        delete flat_item.formasfarmaceuticas_viasadministracion;
      }

      var atc_interacciones_atc = [];
      if (flat_item.hasOwnProperty('atc_interacciones_atc')) {
        atc_interacciones_atc = flat_item.atc_interacciones_atc;
        delete flat_item.atc_interacciones_atc;
      }

      var atc_duplicidades = [];
      if (flat_item.hasOwnProperty('atc_duplicidades')) {
        atc_duplicidades = flat_item.atc_duplicidades;
        delete flat_item.atc_duplicidades;
      }

      var atc_desaconsejados_geriatria = [];
      if (flat_item.hasOwnProperty('atc_desaconsejados_geriatria')) {
        atc_desaconsejados_geriatria = flat_item.atc_desaconsejados_geriatria;
        delete flat_item.atc_desaconsejados_geriatria;
      }

      var notaseguridad = [];
      if (flat_item.hasOwnProperty('notaseguridad')) {
        atc_desaconsejados_geriatria = flat_item.notaseguridad;
        delete flat_item.notaseguridad;
      }


      Prescripcion.create(flat_item).exec(function (err, created) {
        if (err) sails.log.error("[Prescripcion] - Error creating: " + err);
        else {
          //>>>>> composicion_pa <<<<<
          created.formasfarmaceuticas_composicion_pa.add(composicion_pa);

          //>>>>> atc_interacciones_atc <<<<<
          created.atc_interacciones_atc.add(atc_interacciones_atc);

          //>>>>> atc_duplicidades <<<<<
          created.atc_duplicidades.add(atc_duplicidades);

          //>>>>> atc_desaconsejados_geriatria <<<<<
          created.atc_desaconsejados_geriatria.add(atc_desaconsejados_geriatria);

          //>>>>> notaseguridad <<<<<
          created.notaseguridad.add(notaseguridad);

          if (excipientes) {
            excipientes.forEach(function (excip) {
              Excipientes.findOne({"_id": excip.cod_excipiente}).exec(function (err, found) {
                if (err) sails.log.error("[Prescripcion] - Error: " + err);
                else {
                  //>>>>> excipientes <<<<<
                  created.formasfarmaceuticas_excipientes.add(found.id);
                  if (vias_administracion) {
                    vias_administracion.forEach(function (vadmon) {
                      ViasAdministracion.findOne({"_id": vadmon.cod_via_admin}).exec(function (err, found) {
                        if (err) sails.log.error("[Prescripcion] - Error: " + err);
                        //>>>>> viasadministracion <<<<<
                        created.formasfarmaceuticas_viasadministracion.add(found.id);
                        created.save(function (err) {
                          if (err) sails.log.error("[Prescripcion] - Saving Error: " + err);
                          xml.resume();
                        });
                      })
                    })
                  }
                }
              })
            })
          }
        }
      });
    });
    xml.on('endElement: ' + endCollection, function () {
      return resolve();
    });
  });
};
