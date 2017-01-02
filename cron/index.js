const fs = require ('fs');
const request = require('request');
const unzip = require('unzip');
const fstream = require('fstream');
const Waterline = require('waterline');
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

var now = Date.now();
var waterline = new Waterline();
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


request('http://listadomedicamentos.aemps.gob.es/prescripcion.zip')
.pipe(fs.createWriteStream(now+'.zip'))
.on('close', function () {
  console.log('[INFO] - Downloaded new data, timestamp: '+now);
  var readStream = fstream.Reader(now+'.zip');
  var writeStream = fstream.Writer('data/');
  readStream.pipe(unzip.Parse()).pipe(writeStream).on('close', function(){
    clean();
    update();
  });
});

function clean (){
  console.log('[INFO] - Unzipped to folder, timestamp: '+now);
  fs.unlink(now+'.zip', (err) => {
    if (err) throw err;
    console.log('[INFO] - successfully cleaned zip file');
  });
}

function update(){
  waterline.initialize(WaterlineConfig, function (err, ontology) {
    if (err) {
      return console.error(err);
    }
    // Tease out fully initialised models.
    var Atc = ontology.collections.atc;
    Atc.create({ // First we create a user.
      nroatc: 260,
      codigoatc: 'A05AX',
      descatc: 'A05AX - Otros fármacos para terapia biliar'
    }).then(function (atc) { // Then we grab all users and their pets
      return Atc.find();

    }).then(function(atc){ // Results of the previous then clause are passed to the next
      console.dir(atc);

    }).catch(function(err){ // If any errors occur execution jumps to the catch block.
      console.error(err);
    });
  });

}
