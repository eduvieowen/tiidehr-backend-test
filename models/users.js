
module.exports = (sequelize, dataType) => {

    const User = sequelize.define('temp_user',
        {
            firstName: {
                type: dataType.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notNull: {msg: 'Please enter your first name'}
                }
            },
            middleName: {
                type: dataType.STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Please enter your middle name'}
                }
            },
            lastName: {
                type: dataType.STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Please enter your last name'}
                }
            },
            username: {
                type: dataType.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    // len: {args:[6, 10], msg:'username must be min of 6 and max of 10 chars'},
                    notNull:{msg: 'Please enter your username'}
                }
            },
            password: {
                type: dataType.STRING,
                validate: {
                    // is: /^[0-9a-f]{64}/i, msg: 'password must be alphanumeric'
                }
            },
            email: {
                type: dataType.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            }
        }
    );
    return User;
    

    // (async () => {
    //     await db.sequelize
    //         .sync({ force: true })
    //         .then(() => {
    //             console.log('------TEMP_USER SYNCED------');
    //         })
    //         .catch((err) => {
    //             console.log('------UNABLE TO SYNC TEMP_USER------', err);
    //         });
    // })
}
