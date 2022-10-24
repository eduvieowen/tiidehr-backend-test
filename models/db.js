const Sequelize = require('sequelize');
require('dotenv').config();  
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, 
{
  host : process.env.DB_HOST,
  dialect : process.env.DB_DIALECT,
  pool:
  {
    max:5,
    min:0,
    acquire:5000,
    idle:1000
  }
}); // DB Config

/* check DB connectivity */
sequelize.authenticate()
  .then(()=> {
    console.log('------DB CONNECTED------');
  })
  .catch(err => {
    console.log('------COULD NOT ESTABLISH CONNECTION TO DB------', err);
  });

const db = {};
db.Sequelize = Sequelize; // can use to work with Sequelize
db.sequelize = sequelize; // can use to work with DB tables

// Register DB models
db.users = require('./users.js')(sequelize, Sequelize);
db.roles = require('./roles.js')(sequelize, Sequelize);
db.leaves = require('./leaves.js')(sequelize, Sequelize);
db.staff = require('./staff.js')(sequelize, Sequelize);

//Relationships
// one to one
db.users.hasOne(db.staff);
db.staff.belongsTo(db.users); // a has foreign key b

// one to many
db.staff.hasMany(db.leaves);
db.leaves.belongsTo(db.staff);

// many to many
db.roles.belongsToMany(db.users, {through : 'userRole'});
db.users.belongsToMany(db.roles, {through : 'userRole'});
module.exports = db;