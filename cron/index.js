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
const PRESCRIPCION_ATC = require('./schema/prescripcion_atc.js');
const PRESCRIPCION_COM_PA = require('./schema/prescripcion_com_pa.js');
const PRESCRIPCION_DUP = require('./schema/prescripcion_dup.js');
const PRESCRIPCION_FOR_FAR = require('./schema/prescripcion_for_far.js');
const PRESCRIPCION = require('./schema/prescripcion.js');
const WaterlineConfig = require('./schema/_config.js');

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
waterline.loadCollection(PRESCRIPCION_ATC);
waterline.loadCollection(PRESCRIPCION_COM_PA);
waterline.loadCollection(PRESCRIPCION_DUP);
waterline.loadCollection(PRESCRIPCION_FOR_FAR);
waterline.loadCollection(PRESCRIPCION);

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
  updateFfarmaceutica();
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
            nro_atc: nroatc,
            cod_atc: codigoatc,
            des_catc: descatc
          },{
            nro_atc: nroatc,
            cod_atc: codigoatc,
            des_catc: descatc
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

function updateDCPF(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var Dcpf = ontology.collections.dcpf;

    fs.readFile('data/DICCIONARIO_DCPF.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion_dcpf.dcpf
        for(var item in index){
          var codigodcpf = index[item].codigodcpf.toString();
          var nombredcpf = index[item].nombredcpf.toString();
          var nombrecortodcpf = index[item].nombrecortodcpf.toString();
          var codigodcp = index[item].codigodcp.toString();
          Dcpf.updateOrCreate({
            codigodcpf: codigodcpf,
            nombredcpf: nombredcpf,
            nombrecortodcpf: nombrecortodcpf,
            codigodcp: codigodcp
          },{
            codigodcpf: codigodcpf,
            nombredcpf: nombredcpf,
            nombrecortodcpf: nombrecortodcpf,
            codigodcp: codigodcp
          }, function(){
            console.log("[INFO - Item created or updated on DCPF]");
          });
        }
      });
    });
  });
}

function updateDCSA(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var Dcsa = ontology.collections.dcsa;

    fs.readFile('data/DICCIONARIO_DCSA.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion_dcsa.dcsa
        for(var item in index){
          var codigodcsa = index[item].codigodcsa.toString();
          var nombredcsa = index[item].nombredcsa.toString();
          Dcsa.updateOrCreate({
            codigodcsa: codigodcsa,
            nombredcsa: nombredcsa
          },{
            codigodcsa: codigodcsa,
            nombredcsa: nombredcsa
          }, function(){
            console.log("[INFO - Item created or updated on DCSA]");
          });
        }
      });
    });
  });
}

function updateEnvases(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var Envases = ontology.collections.envases;

    fs.readFile('data/DICCIONARIO_ENVASES.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion_envases.envases
        for(var item in index){
          var codigoenvase = index[item].codigoenvase.toString();
          var envase = index[item].envase.toString();
          Envases.updateOrCreate({
            codigoenvase: codigoenvase,
            envase: envase
          },{
            codigoenvase: codigoenvase,
            envase: envase
          }, function(){
            console.log("[INFO - Item created or updated on Envase]");
          });
        }
      });
    });
  });
}

function updateExcipientes(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var Excipientes = ontology.collections.excipientes;

    fs.readFile('data/DICCIONARIO_EXCIPIENTES_DECL_OBLIGATORIA.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion_excipientes.excipientes
        for(var item in index){
          var codigoedo = index[item].codigoedo.toString();
          var edo = index[item].edo.toString();
          Excipientes.updateOrCreate({
            cod_excipiente: codigoedo,
            edo: edo
          },{
            cod_excipiente: codigoedo,
            edo: edo
          }, function(){
            console.log("[INFO - Item created or updated on Excipientes]");
          });
        }
      });
    });
  });
}

function updateFfarmaceuticaSimp(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var Ffarmaceuticasimp = ontology.collections.ffarmaceuticasimp;

    fs.readFile('data/DICCIONARIO_FORMA_FARMACEUTICA_SIMPLIFICADAS.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion_formas_farmaceuticas_simplificadas.formasfarmaceuticassimplificadas;
        for(var item in index){
          var codigoformafarmaceuticasimplificada = index[item].codigoformafarmaceuticasimplificada.toString();
          var formafarmaceuticasimplificada = index[item].formafarmaceuticasimplificada.toString();
          Ffarmaceuticasimp.updateOrCreate({
            cod_forfar_simplificada: codigoformafarmaceuticasimplificada,
            forfar_simplificada: formafarmaceuticasimplificada
          },{
            cod_forfar_simplificada: codigoformafarmaceuticasimplificada,
            forfar_simplificada: formafarmaceuticasimplificada
          }, function(){
            console.log("[INFO - Item created or updated on Ffarmaceuticasimp]");
          });
        }
      });
    });
  });
}

function updateFfarmaceutica(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var Ffarmaceutica = ontology.collections.ffarmaceutica;

    fs.readFile('data/DICCIONARIO_FORMA_FARMACEUTICA.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion_formas_farmaceuticas.formasfarmaceuticas
        for(var item in index){
          var codigoformafarmaceutica = index[item].codigoformafarmaceutica.toString();
          var formafarmaceutica = index[item].formafarmaceutica.toString();
          var codigoformafarmaceuticasimplificada = index[item].codigoformafarmaceuticasimplificada.toString();
          Ffarmaceutica.updateOrCreate({
            cod_forfar: codigoformafarmaceutica,
            forfar: formafarmaceutica,
            cod_forfar_simplificada: codigoformafarmaceuticasimplificada
          },{
            cod_forfar: codigoformafarmaceutica,
            forfar: formafarmaceutica,
            cod_forfar_simplificada: codigoformafarmaceuticasimplificada

          }, function(){
            console.log("[INFO - Item created or updated on Ffarmaceutica]");
          });
        }
      });
    });
  });
}

function updateLaboratorio(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var Laboratorio = ontology.collections.laboratorio;
    //TODO: from here!

    fs.readFile('data/DICCIONARIO_FORMA_FARMACEUTICA.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion_formas_farmaceuticas.formasfarmaceuticas
        for(var item in index){
          var codigoformafarmaceutica = index[item].codigoformafarmaceutica.toString();
          var formafarmaceutica = index[item].formafarmaceutica.toString();
          var codigoformafarmaceuticasimplificada = index[item].codigoformafarmaceuticasimplificada.toString();
          Ffarmaceutica.updateOrCreate({
            cod_forfar: codigoformafarmaceutica,
            forfar: formafarmaceutica,
            cod_forfar_simplificada: codigoformafarmaceuticasimplificada
          },{
            cod_forfar: codigoformafarmaceutica,
            forfar: formafarmaceutica,
            cod_forfar_simplificada: codigoformafarmaceuticasimplificada

          }, function(){
            console.log("[INFO - Item created or updated on Ffarmaceutica]");
          });
        }
      });
    });
  });


function clean (){
  console.log('[INFO] - Unzipped to folder, timestamp: '+now);
  fs.unlink(now+'.zip', (err) => {
    if (err) throw err;
    console.log('[INFO] - successfully cleaned zip file');
  });
}
