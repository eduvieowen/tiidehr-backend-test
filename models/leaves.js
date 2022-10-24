
module.exports = (sequelize, dataType) => {

    const Leave = sequelize.define('temp_leave',
        {
            title: {
                type: dataType.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notNull: {msg: 'Please enter leave title'}
                }
            },
            description: {
                type: dataType.STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Please enter leave description'}
                }
            }
        }
    );
    return Leave;
}
