/**
 * atc.js
 *
 * @description :: Server-side helper function.
 * @help        :: See http://sailsjs.com/docs/concepts/helpers
 */

const fs = require('fs');
const _ = require('lodash');
const XmlStream = require('xml-stream');

/******************Model Variables**********************/
const itemName = 'atc';
const modelName = 'atc';
const itemIdName = 'nroatc';
const xmlFile = 'data/DICCIONARIO_ATC.xml';
const endCollection = 'aemps_prescripcion_atc';
/************************END*****************************/

module.exports = {


  friendlyName: 'Atc Helper',


  description: '',


  inputs: {},


  exits: {},


  fn: function (inputs, exits) {
    let insertedIds = [];
    let updatedIds = [];
    let allIds = [];
    let ids = [];

    sails.log.info("[CRON] - [ATC] - Updating ATC...");

    let stream = fs.createReadStream(xmlFile);
    let xml = new XmlStream(stream);
    xml.collect(itemName);
    xml.on('endElement: ' + itemName, function (item) {
      xml.pause();

      let element = item;
      let id = item[itemIdName];
      delete item[itemIdName];
      item.id = id;
      sails.log.info("ID: "+id);
      sails.log.info("ITEM ID: "+item.id);


      Atc.findOrCreate({id: id}, item).exec(function (err, atc, wasCreatedOrFound) {
        if (err) {
          sails.log.error('[ATC] - Error: '+err);
        }
        xml.resume();
      });


      // Atc.native(function (err, collection) {
      //   if (err) reject(err);
      //
      //   //TODO: Change model names HERE--->
      //   collection.updateOne({nroatc: id}, {$set: item}, {upsert: true}, function (err, results) {
      //     if (err) reject(err);
      //
      //     results = JSON.parse(results);
      //     if (results.hasOwnProperty('upserted')) {
      //       //Item inserted
      //       insertedIds.push(results.upserted[0]._id);
      //       Updates.create({
      //         model: modelName,
      //         new_item: element,
      //         inserted: true,
      //         updated: false,
      //         deleted: false
      //       }).exec(function (err, results) {
      //         if (err) reject(err);
      //         xml.resume()
      //       })
      //     } else if (results['nModified'] == 1) {
      //       //Item modified
      //       updatedIds.push(item._id);
      //       Updates.create({
      //         model: modelName,
      //         old_item: oldItem,
      //         new_item: element,
      //         inserted: false,
      //         updated: true,
      //         deleted: false
      //       }).exec(function (err, results) {
      //         if (err) reject(err);
      //         xml.resume();
      //       })
      //     } else xml.resume();
      //   })
      // });


    });
    xml.on('endElement: ' + endCollection, function () {
      // All done.
      return exits.success();
    });


  }


};
