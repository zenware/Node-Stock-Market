var express = require('express');
var app = express();
var request = require('bhttp');
var readline = require('readline');
var pg = require('pg');
var rl = readline.createInterface(process.stdin, process.stdout);
var config = require('./config.json');
var fromScratch = false;

var knex = require('knex')(config.knex);

var formatQuery = require('./format-query');
var formatData = require('./format-data');

// var dbSchema = require('./db-schema-test');
if (fromScratch) buildTable('stock');

/* Test function */
function buildTable(table) {
    return knex.schema.hasTable(table).then(function(exists) {
        if (!exists) {
            return knex.schema.createTable(table, function(t) {
                t.string('symbol', 10)
                    .notNullable()
                    .primary();
                t.decimal('price')
                    .notNullable();
            });
        }
        console.log('Table Exists');
    });
}

knex.insert({
    symbol: 'TEST',
    price: 998.45
}).into('stock');

rl.setPrompt('›› ');
rl.prompt(); 

rl.on('line', function(line) {
    var query = formatQuery(line);
    request.get(query, {}, function(error, response) {
        if (error) console.log('Exec error: ' + error);
        var data = formatData(response.body.toString());
        /* Symbol & Price */
        var qSymbol = data.t, qPrice = Number(data.l);
        console.log(qSymbol, qPrice);

        /* Insert values into 'stock' table */
        knex('stock').insert({
            symbol: qSymbol,
            price: qPrice
        });

        // console.log(data);
        rl.prompt();
    });
});

app.listen(6446, function () {
    console.log('Server running on port: 6446');
});