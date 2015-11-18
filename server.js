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
var inputValidation = require('./input-validation');

// var dbSchema = require('./db-schema-test');
// if (fromScratch) buildTable('stock');

/* Test function */
function buildStockTable(table) {
    return knex.schema.hasTable(table).then(function(exists) {
        if (!exists) {
            return knex.schema.createTable(table, function(t) {
                t.string('symbol', 10)
                    .notNullable()
                    .primary();
                t.decimal('price')
                    .notNullable();
                t.string('date', 20)
                    .notNullable();
            });
        }
        console.log('Table Exists');
    });
}

function buildUserTable(table) {
    return knex.schema.hasTable(table).then(function(exists) {
        if (!exists) {
            return knex.schema.createTable(table, function(t) {
                t.increments('id')
                    .notNullable()
                    .primary()
                    .unique();
                t.string('email', 50)
                    .unique();
                t.string('password', 25);
            });
        }
    });
}

function buildPortfolioTable(table) {
    return knex.schema.hasTable(table).then(function(exists) {
        if (!exists) {
            return knex.schema.createTable(table, function(t) {
                t.increments('portfolio_id')
                    .notNullable()
                    .primary()
                    .unique();
                t.string('name', 30)
                    .notNullable();
            });
        }
    });
}

// buildTable('TestOne');

/* Test functions */
function insertSymbol(symbol, price, date) {
    return knex('TestOne').insert({
        symbol: symbol,
        price: price,
        date: date
    }).then(function() {
        knex('TestOne').count('symbol').then(function(data) {
            console.log(data);
        });
    });
}

function insertUser(username, password) {
    return knex('user').insert({
        username: username,
        password: password
    }).then(function(data) {
        console.log(data);
    });
}
/* Test functions */

rl.setPrompt('›› ');
rl.prompt(); 

rl.on('line', function(line) {
    var validatedInput = inputValidation(line);
    validatedInput.forEach(function(x) {
        var query = formatQuery(x);
        request.get(query, {}, function(error, response) {
            if (error) console.log('Exec error: ' + error);
            var data = formatData(response.body.toString());

            console.log(data);

            /* Stock Data */
            var stockData = {
                symbol: data.t,
                exchange: data.e,
                price: Number(data.l),
                priceChange: data.c,
                percentChange: Number(data.cp_fix),
                lastOpen: data.lt,
                lastDateStamp: data.lt_dts
            };

            // console.log(stockData);

            /* Insert symbol values into table */
            /* insertSymbol( 
                dataObject.symbol,
                dataObject.price,
                dataObject.date 
            ); */
        });
    });
    rl.prompt();
});

app.listen(6446, function () {
    console.log('Server running on port: 6446');
});