const fs = require ('fs');
const request = require('request');
const unzip = require('unzip');
const fstream = require('fstream');
const Waterline = require('waterline');
const xml2js = require ('xml2js');

const ATC = require('./schema/atc.js');
const DCP = require('./schema/dcp.js');
const DCPF = require('./schema/dcpf.js');
const DCSA = require('./schema/dcsa.js');
const ENVASES = require('./schema/envases.js');
const EXCIPIENTES = require('./schema/excipientes.js');
const FFARMACEUTICASIMP = require('./schema/ffarmaceuticasimp.js');
const FFARMACEUTICA = require('./schema/ffarmaceutica.js');
const LABORATORIO = require('./schema/laboratorio.js');
const PACTIVOS = require('./schema/pactivos.js');
const SITRIESGO = require('./schema/sitriesgo.js');
const UNICONT = require('./schema/unicont.js');
const VADMON = require('./schema/vadmon.js');
const WaterlineConfig = require('./schema/config.js');

var pull = false;
var now = Date.now();
var waterline = new Waterline();
var parser = new xml2js.Parser();

waterline.loadCollection(ATC);
waterline.loadCollection(DCP);
waterline.loadCollection(DCPF);
waterline.loadCollection(DCSA);
waterline.loadCollection(ENVASES);
waterline.loadCollection(EXCIPIENTES);
waterline.loadCollection(FFARMACEUTICASIMP);
waterline.loadCollection(FFARMACEUTICA);
waterline.loadCollection(LABORATORIO);
waterline.loadCollection(PACTIVOS);
waterline.loadCollection(SITRIESGO);
waterline.loadCollection(UNICONT);
waterline.loadCollection(VADMON);

if(pull){
  request('http://listadomedicamentos.aemps.gob.es/prescripcion.zip')
  .pipe(fs.createWriteStream(now+'.zip'))
  .on('close', function () {
    console.log('[INFO] - Downloaded new data, timestamp: '+now);
    var readStream = fstream.Reader(now+'.zip');
    var writeStream = fstream.Writer('data/');
    readStream.pipe(unzip.Parse()).pipe(writeStream).on('close', function(){
      clean();
      updateATC();
    })
  })
}else{
  updateDCP();
}

function updateATC(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var Atc = ontology.collections.atc;

    fs.readFile('data/DICCIONARIO_ATC.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion_atc.atc
        for(var item in index){
          var nroatc = index[item].nroatc.toString();
          var codigoatc = index[item].codigoatc.toString();
          var descatc = index[item].descatc.toString();
          Atc.updateOrCreate({
            nroatc: nroatc,
            codigoatc: codigoatc,
            descatc: descatc
          },{
            nroatc: nroatc,
            codigoatc: codigoatc,
            descatc: descatc
          }, function(){
            console.log("[INFO - Item created or updated on ATC]");
          });
        }
      });
    });
  });
}

function updateDCP(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var Dcp = ontology.collections.dcp;

    fs.readFile('data/DICCIONARIO_DCP.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion_dcp.dcp
        for(var item in index){
          var codigodcp = index[item].codigodcp.toString();
          var nombredcp = index[item].nombredcp.toString();
          Dcp.updateOrCreate({
            codigodcp: codigodcp,
            nombredcp: nombredcp
          },{
            codigodcp: codigodcp,
            nombredcp: nombredcp
          }, function(){
            console.log("[INFO - Item created or updated on DCP]");
          });
        }
      });
    });
  });
}



function clean (){
  console.log('[INFO] - Unzipped to folder, timestamp: '+now);
  fs.unlink(now+'.zip', (err) => {
    if (err) throw err;
    console.log('[INFO] - successfully cleaned zip file');
  });
}
