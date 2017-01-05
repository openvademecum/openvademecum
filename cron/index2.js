var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
fs.readFile('data/Prescripcion.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        fs.writeFileSync('./data.json', JSON.stringify(result) , 'utf-8');
    });
});
