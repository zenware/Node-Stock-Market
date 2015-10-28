var express = require('express'), app = express();
var request = require('bhttp');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);


var knex = require('knex');
var bookshelf = require('bookshelf');

var dataGet = require('./data-get');

rl.setPrompt('-> ');
rl.prompt();

/*
[{
    "id": "ID NUMBER"
    ,"t" : "SYMBOL"
    ,"e" : "EXCHANGE"
    ,"l" : "706.35"
    ,"l_fix" : "706.35"
    ,"l_cur" : "CURRENT PRICE"
    ,"s": "0"
    ,"ltt": "Last Trade Date Time"
    ,"lt" : "Last Trade Time"
    ,"lt_dts" : "Last Trade Date Time Stamp"
    ,"c" : "PRICE CHANGE"
    ,"c_fix" : "PRICE CHANGE"
    ,"cp" : "PERCENTAGE CHANGE"
    ,"cp_fix" : "PERCENTAGE CHANGE"
    ,"ccol" : "chr"
    ,"pcls_fix" : "712.78"
}]
*/

rl.on('line', function(line) {
    var query = dataGet(line);
    request.get(query, {}, function(error, response) {
        if (error) console.log('Exec error: ' + error);
        console.log(response.body.toString());
        rl.prompt();
    });
});


var server = app.listen(6446, function () {
    console.log('Server running on port: 6446');
});