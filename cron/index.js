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
const SITREGISTRO = require('./schema/sitregistro.js');
const UNICONT = require('./schema/unicont.js');
const VADMON = require('./schema/vadmon.js');
const PRESCRIPCION_ATC = require('./schema/prescripcion_atc.js');
const PRESCRIPCION_COM_PA = require('./schema/prescripcion_com_pa.js');
const PRESCRIPCION_DUP = require('./schema/prescripcion_dup.js');
const PRESCRIPCION_FOR_FAR = require('./schema/prescripcion_for_far.js');
const PRESCRIPCION_DES_GER = require('./schema/prescripcion_des_ger.js');
const PRESCRIPCION_INT_ATC = require('./schema/prescripcion_int_atc.js');
const PRESCRIPCION = require('./schema/prescripcion.js');
const WaterlineConfig = require('./schema/_config.js');

var pull = false;
var now = Date.now();
var waterline = new Waterline();
var parser = new xml2js.Parser({explicitArray : false});

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
waterline.loadCollection(SITREGISTRO);
waterline.loadCollection(UNICONT);
waterline.loadCollection(VADMON);
waterline.loadCollection(PRESCRIPCION_ATC);
waterline.loadCollection(PRESCRIPCION_COM_PA);
waterline.loadCollection(PRESCRIPCION_DUP);
waterline.loadCollection(PRESCRIPCION_FOR_FAR);
waterline.loadCollection(PRESCRIPCION_DES_GER);
waterline.loadCollection(PRESCRIPCION_INT_ATC);
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
  updatePrescripcion();
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
            cod_envase: codigoenvase,
            envase: envase
          },{
            cod_envase: codigoenvase,
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
    fs.readFile('data/DICCIONARIO_LABORATORIOS.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion_laboratorios.laboratorios
        for(var item in index){
          var codigolaboratorio = index[item].codigolaboratorio.toString();
          var laboratorio = index[item].laboratorio.toString();
          var direccion = index[item].direccion.toString();
          var codigopostal = index[item].codigopostal || null;
          var localidad = index[item].localidad || null;
          Laboratorio.updateOrCreate({
            codigolaboratorio: codigolaboratorio,
            laboratorio: laboratorio,
            direccion: direccion,
            codigopostal: codigopostal,
            localidad: localidad
          },{
            codigolaboratorio: codigolaboratorio,
            laboratorio: laboratorio,
            direccion: direccion,
            codigopostal: codigopostal,
            localidad: localidad
          }, function(){
            console.log("[INFO - Item created or updated on Laboratorio]");
          });
        }
      });
    });
  });
}

function updatePActivos(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var PActivos = ontology.collections.pactivos;
    fs.readFile('data/DICCIONARIO_PRINCIPIOS_ACTIVOS.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion_principios_activos.principiosactivos
        for(var item in index){
          var nroprincipioactivo = index[item].nroprincipioactivo.toString();
          var codigoprincipioactivo = index[item].codigoprincipioactivo.toString();
          var principioactivo = index[item].principioactivo.toString();
          PActivos.updateOrCreate({
            nro_principio_activo: nroprincipioactivo,
            cod_principio_activo: codigoprincipioactivo,
            principio_activo: principioactivo
          },{
            nro_principio_activo: nroprincipioactivo,
            cod_principio_activo: codigoprincipioactivo,
            principio_activo: principioactivo
          }, function(){
            console.log("[INFO - Item created or updated on PActivo]");
          });
        }
      });
    });
  });
}

function updateSitRegistro(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var SitRegistro = ontology.collections.sitregistro;
    fs.readFile('data/DICCIONARIO_SITUACION_REGISTRO.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion_situacion_registro.situacionesregistro
        for(var item in index){
          var codigosituacionregistro = index[item].codigosituacionregistro.toString();
          var situacionregistro = index[item].situacionregistro.toString();
          SitRegistro.updateOrCreate({
            cod_sitreg: codigosituacionregistro,
            situacionregistro: situacionregistro
          },{
            cod_sitreg: codigosituacionregistro,
            situacionregistro: situacionregistro
          }, function(){
            console.log("[INFO - Item created or updated on SitRegistro]");
          });
        }
      });
    });
  });
}

function updatePActivos(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var PActivos = ontology.collections.pactivos;
    fs.readFile('data/DICCIONARIO_PRINCIPIOS_ACTIVOS.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion_principios_activos.principiosactivos
        for(var item in index){
          var nroprincipioactivo = index[item].nroprincipioactivo.toString();
          var codigoprincipioactivo = index[item].codigoprincipioactivo.toString();
          var principioactivo = index[item].principioactivo.toString();
          PActivos.updateOrCreate({
            nro_principio_activo: nroprincipioactivo,
            cod_principio_activo: codigoprincipioactivo,
            principio_activo: principioactivo
          },{
            nro_principio_activo: nroprincipioactivo,
            cod_principio_activo: codigoprincipioactivo,
            principio_activo: principioactivo
          }, function(){
            console.log("[INFO - Item created or updated on PActivo]");
          });
        }
      });
    });
  });
}

function updateUniCont(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var UniCont = ontology.collections.unicont;
    fs.readFile('data/DICCIONARIO_UNIDAD_CONTENIDO.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion_unidad_contenido.unidadescontenido
        for(var item in index){
          var codigounidadcontenido = index[item].codigounidadcontenido.toString();
          var unidadcontenido = index[item].unidadcontenido.toString();
          UniCont.updateOrCreate({
            unid_contenido: codigounidadcontenido,
            unidadcontenido: unidadcontenido
          },{
            unid_contenido: codigounidadcontenido,
            unidadcontenido: unidadcontenido
          }, function(){
            console.log("[INFO - Item created or updated on UniCont]");
          });
        }
      });
    });
  });
}

function updateVAdmon(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var VAdmon = ontology.collections.vadmon;
    fs.readFile('data/DICCIONARIO_VIAS_ADMINISTRACION.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion_vias_administracion.viasadministracion
        for(var item in index){
          var codigoviaadministracion = index[item].codigoviaadministracion.toString();
          var viaadministracion = index[item].viaadministracion.toString();
          VAdmon.updateOrCreate({
            cod_via_admin: codigoviaadministracion,
            via_admin: viaadministracion
          },{
            cod_via_admin: codigoviaadministracion,
            via_admin: viaadministracion
          }, function(){
            console.log("[INFO - Item created or updated on VAdmon]");
          });
        }
      });
    });
  });
}

function updatePrescripcion(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var Prescripcion = ontology.collections.prescripcion;
    fs.readFile('data/Prescripcion.xml', function(err, data) {
      parser.parseString(data, function (err, data) {
        var index = data.aemps_prescripcion.prescription;
        for(var item in index){
          Prescripcion.updateOrCreate(index[item],index[item], function(ko, ok){
            if(ko){
              console.log("[ERROR] - Prescripcion.updateOrCreate error: "+ko);
              console.log("_DATA_: "+JSON.stringify(index[item]))
            }else if(ok){
              console.log("[INFO - Item created or updated on Prescripcion]");
            }
          });
        }
      });
    });
  });
}

function test(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    var Prescripcion = ontology.collections.prescripcion;

    Prescripcion.findOne({nro_definitivo: 66337}).populate('formasfarmaceuticas').exec(function(err, users) {
      if(err){
        console.log(err)
      }
      console.log(JSON.stringify(users));
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
