module.exports = {
    users: {
        id: {
            type: 'increments',
            nullable: false,
            primary: true
        },
        email: {
            type: 'string',
            maxlength: 254,
            nullable: false,
            unique: true
        }
    },
    portfolio: {
        id: {
            type: 'increments',
            nullable: false,
            primary: true,
            unique: true
        },
        name: {
            type: 'string',
            maxlength: 50,
            nullable: false
        }
    },
    stock: {
        company: {
            type: 'string',
            maxlength: 30,
            nullable: false
        },
        exchange: {
            type: 'string',
            maxlength: 30,
            nullable: true
        },
        symbol: {
            type: 'string',
            maxlength: 10,
            nullable: false,
            primary: true
        }
    },
    stock_price: {
        nullable: false,
        price: { type: 'decimal' },
        stock_id: true,
        timestamp: 'timestamp',
        type: 'increments'
    }
}