const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAccommodation = function (callback, houseId) {
  connection.query('SELECT * from accommodations where id=' + houseId, function (error, accommodation, fields) {
    if (error) {
      console.log(error);
    } else {
      results = accommodation[0];

      connection.query('SELECT * from reviews where accommodationId=' + houseId, function (error, reviews, fields) {
        if (error) {
          console.log(error); 
        } else {
          results.reviews = reviews;
          callback(results);
        }
      });
    }
  });
};

module.exports = {
  getAccommodation
};
