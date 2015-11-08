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
        portfolios: {
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
            },
            stocks: {
                id: {
                    type: 'increments',
                    nullable: false,
                    primary: true
                },
                name: {
                    type: 'string',
                    maxlength: 20,
                    nullable: false
                }
            }
        }
    }
}