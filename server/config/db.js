const mysql = require('mysql');

const connectDB = () => {
  try {
    var mysql = require('mysql');

    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Women=Badx1000",
      database: "mf"
    });
    
    connection.connect(function(err) {
      if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
      }
      console.log('Connected to MySQL');
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
