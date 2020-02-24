const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const newReview = function (callback, data) {
  var newID1;
  var newID2;

  connection.query('SELECT COUNT(*) FROM accommodations', function(error1, count1, fields1) {
    if (error1) {
      console.log(error1);
    } else {
      newID1 = count1;

      connection.query('SELECT COUNT(*) FROM accommodations', function(error2, count2, fields2) {
        if (error2) {
          console.log(error2);
        } else {
          newID2 = count2;

          var str = '';
          for (var key in data) {
            str += data[key] + ',';
          }
          //remove trailing comma
          str = str.slice(0, str.length - 1);

          connection.query('INSERT INTO reviews VALUES' + str, function (error3, count3, fields3) {
            if (error3) {
            console.log(error3);
            } else {
              callback(newID1, newID2);
            }
          });
        }
      });
    }
  });

  

  
}

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

const updateReview = function (callback, reviewId, data) {
  var str = '';

  for (var key in data) {
    str += key + ' = ' + data[key] + ',';
  }

  //remove trailing comma
  str = str.slice(0, str.length - 1);

  connection.query('UPDATE reviews SET ' + str + 'where id=' + reviewId, function (error, review, fields) {
    if (error) {
      console.log(error); 
    } else {
      callback();
    }
  });
}

const deleteReview = function (callback, data) {
  connection.query('DELETE FROM reviews where id=' + reviewId, function (error, review, fields) {
    if (error) {
      console.log(error); 
    } else {
      callback();
    }
  });
}

module.exports = {
  newReview,
  getAccommodation,
  updateReview,
  deleteReview
};
