const fs = require ('fs');
const request = require('request');
const unzip = require('unzip');
const fstream = require('fstream');

var now = Date.now();

request('http://listadomedicamentos.aemps.gob.es/prescripcion.zip')
.pipe(fs.createWriteStream(now+'.zip'))
.on('close', function () {
  console.log('[INFO] - Downloaded new data, timestamp: '+now);
  var readStream = fstream.Reader(now+'.zip');
  var writeStream = fstream.Writer('data/');
  readStream.pipe(unzip.Parse()).pipe(writeStream).on('close', function(){
    clean();
  });
});

function clean (){
  console.log('[INFO] - Unzipped to folder, timestamp: '+now);
  fs.unlink(now+'.zip', (err) => {
    if (err) throw err;
    console.log('[INFO] - successfully cleaned zip file');
  });
}
