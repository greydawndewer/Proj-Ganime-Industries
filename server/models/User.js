const { Sequelize, DataTypes } = require('sequelize');

// Define the sequelize instance and connect to the database
const sequelize = new Sequelize('mf', 'root', 'Women=Badx1000', {
  host: 'localhost',
  dialect: 'mysql', // or 'postgres' for PostgreSQL
});

// Define the User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database
(async () => {
  await sequelize.sync();
  console.log('Database synchronized');
})();

// Export the User model
module.exports = User;