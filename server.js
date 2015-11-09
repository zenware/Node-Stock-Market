var express = require('express'), app = express();
var request = require('bhttp');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

var knex = require('knex')({
    client: 'postgresql',
    connection: {
        host: '127.0.0.1',
        user: 'test',
        password: '',
        database: 'NSM',
        charset: 'UTF8'
    }
});

// Formats the query and data retrieved
var formatQuery = require('./format-query');
var formatData = require('./format-data');

var dbSchema = require('./db-schema');

function buildSchema(dbSchema) {
    return Object.keys(dbSchema).forEach(function(tableName) {
        knex.schema.hasTable(tableName).then(function(tableExists) {
            if (!tableExists) {
                return knex.schema.createTable(tableName, function(t) {
                    Object.keys(dbSchema[tableName]).forEach(function(tableCol) {
                        switch (dbSchema[tableName][tableCol]['type']) {
                            default:
                                knexTable[ dbSchema[tableName][tableCol]['type'] ](tableCol, dbSchema[tableName][tableCol]);
                            break;
                        }
                        if ('primary' in dbSchema[tableName][tableCol]) {
                            knexTable.primary();
                        }
                    });
                });
            }
        });
    });
}

buildSchema(dbSchema);

rl.setPrompt('›› ');
rl.prompt(); 

rl.on('line', function(line) {
    var query = formatQuery(line);
    request.get(query, {}, function(error, response) {
        if (error) console.log('Exec error: ' + error);
        var data = formatData(response.body.toString());
        console.log(data);
        rl.prompt();
    });
});

app.listen(6446, function () {
    console.log('\nServer running on port: 6446');
});