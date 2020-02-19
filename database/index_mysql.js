const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);goose.connect('mongodb://localhost/airbnbReviews', { useNewUrlParser: true, useUnifiedTopology: true });

const getAccommodation = function (callback, houseId) {
  connection.query('SELECT * from accommodations where id=' + houseId, function (error, accommodation, fields) {
    if (err) {
      console.log(err);
    } else {
      results = accommodation[0];

      connection.query('SELECT * from reviews where accommodationId=' + houseId, function (error, reviews, fields) {
        if (err) {
          console.log(err);
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
