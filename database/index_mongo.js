const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/airbnbReviews', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected to airbnb DB!");
})

var accommodationSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    accuracy: { type: mongoose.Types.Decimal128 },
    communication: { type: mongoose.Types.Decimal128 },
    cleanliness: { type: mongoose.Types.Decimal128 },
    checkIn: { type: mongoose.Types.Decimal128 },
    value: { type: mongoose.Types.Decimal128 },
    location: { type: mongoose.Types.Decimal128 },
    reviews: [{
      id: { type: Number, required: true },
      userName: String,
      userPicture: String,
      userPageLink: String,
      date: Date,
      reviewText: String,
      accuracy: { type: mongoose.Types.Decimal128 },
      communication: { type: mongoose.Types.Decimal128 },
      cleanliness: { type: mongoose.Types.Decimal128 },
      checkIn: { type: mongoose.Types.Decimal128 },
      value: { type: mongoose.Types.Decimal128 },
      location: { type: mongoose.Types.Decimal128 }
    }]
  }
);

const Accommodation = mongoose.model('accommodations', accommodationSchema);

const getAccommodation = function (callback, houseId) {
  Accommodation.find({ "id": houseId }, function (err, accommodation) {
    if (err) {
      console.log(err);
    } else {
      callback(accommodation);
    }
  });
};

module.exports = {
  Accommodation,
  getAccommodation
};
