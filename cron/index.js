const fs = require ('fs');
const request = require('request');
const unzip = require('unzip');
const fstream = require('fstream');
const Waterline = require('waterline');
const ATC = require('./schema/atc.js');
const WaterlineConfig = require('./schema/config.js');

var now = Date.now();
var waterline = new Waterline();
waterline.loadCollection(ATC);

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
