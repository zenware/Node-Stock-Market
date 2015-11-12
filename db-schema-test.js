// Just testing out another schema
var config = require('./config.json');
var knex = require('knex')(config.knex);

module.exports = {
    users: function() {
        return knex.schema.hasTable('users').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('users', function(t) {
                    t.increments('id').notNullable().primary().unique();
                    t.string('email', 50).unique();
                    t.string('password', 50);
                });
            }
        })
    },
    portfolio: function() {
        return knex.schema.hasTable('portfolio').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('portfolio', function(t) {
                    t.increments('id').notNullable().primary().unique();
                    t.string('name', 50).notNullable();
                });
            }
        });
    },
    stocks: function() {
        return knex.schema.hasTable('stocks').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('stocks', function(t) {
                    // To be added
                });
            }
        })
    },
    stock_data: function() {
        return knex.schema.hasTable('stock_data').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('stock_data', function(t) {
                    // To be added
                });
            }
        });
    }
}