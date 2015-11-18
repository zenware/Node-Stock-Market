var config = require('./config.json');
var knex = require('knex')(config.knex);

module.exports = {
    users: function() {
        return knex.schema.hasTable('users').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('users', function(t) {
                    t.increments('id')
                        .notNullable()
                        .primary()
                        .unique();
                    t.string('email', 50)
                        .unique();
                    t.string('password', 50);
                });
            }
        })
    },
    portfolio: function() {
        return knex.schema.hasTable('portfolio').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('portfolio', function(t) {
                    t.increments('id')
                        .notNullable()
                        .primary()
                        .unique();
                    t.string('name', 50)
                        .notNullable();
                });
            }
        });
    },
    stock: function() {
        return knex.schema.hasTable('stock').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('stock', function(t) {
                    t.string('company', 30)
                        .notNullable();
                    t.string('exchange', 30)
                        .nullable();
                    t.string('symbol', 10)
                        .notNullable()
                        .primary();
                });
            }
        })
    },
    stock_data: function() {
        return knex.schema.hasTable('stock_data').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('stock_data', function(t) {
                    t.decimal('price');
                });
            }
        });
    }
}