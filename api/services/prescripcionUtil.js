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
      var composicion_pa = flat_item.formasfarmaceuticas_composicion_pa;
      delete flat_item.formasfarmaceuticas_composicion_pa;
      var excipientes =[];
      if(flat_item.hasOwnProperty('formasfarmaceuticas_excipientes')){
        excipientes = flat_item.formasfarmaceuticas_excipientes;
        delete flat_item.formasfarmaceuticas_excipientes;
      }
      var vias_administracion = [];
      if(flat_item.hasOwnProperty('formasfarmaceuticas_viasadministracion')){
        vias_administracion = flat_item.formasfarmaceuticas_viasadministracion;
        delete flat_item.formasfarmaceuticas_viasadministracion;
      }



      //flat_item.formasfarmaceuticas_composicion_pa = ID;

      Prescripcion.create(flat_item).exec(function(err, created){
        if (err) sails.log.error("[Prescripcion] - Error creating: "+err);
        else{
          //>>>>> composicion_pa <<<<<
          created.formasfarmaceuticas_composicion_pa.add(composicion_pa);

          if(excipientes){
            excipientes.forEach(function (excip) {
              Excipientes.findOne({"_id":excip.cod_excipiente}).exec(function(err, found){
                if(err) sails.log.error("[Prescripcion] - Error: "+err);
                else{
                  //>>>>> excipientes <<<<<
                  created.formasfarmaceuticas_excipientes.add(found.id);
                  if(vias_administracion){
                    vias_administracion.forEach(function (vadmon) {
                      sails.log.info("ID: "+JSON.stringify(vadmon));
                      ViasAdministracion.findOne({"_id":vadmon.cod_via_admin}).exec(function (err, found) {
                        if(err) sails.log.error("[Prescripcion] - Error: "+err);
                        //>>>>> viasadministracion <<<<<
                        sails.log.info("FOUND: "+JSON.stringify(found));
                        created.formasfarmaceuticas_viasadministracion.add(found.id);
                        created.save(function(err) {
                          if(err) sails.log.error("[Prescripcion] - Saving Error: "+err);
                          //xml.resume();
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

    });


  });
};
