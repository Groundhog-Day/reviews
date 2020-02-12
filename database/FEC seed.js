const faker = require('faker');
const dbReviewModel = require('./index.js');

const FAKE_DATA_SIZE = 10000;

for (let i = 0; i < FAKE_DATA_SIZE; i++) {
  const review = {
    accommodationId: Math.floor(((Math.random() * 100))),
    scores: {
      accuracy: Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 10) / 10,
      communication: Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 10) / 10,
      cleanliness: Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 10) / 10,
      checkIn: Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 10) / 10,
      value: Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 10) / 10,
      location: Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 10) / 10,
      outstandingHospitality: Math.random() > 0.5,
      quickResponses: Math.random() > 0.5,
      stylishSpace: Math.random() > 0.5,
      sparklingClean: Math.random() > 0.5,
      amazingAmenities: Math.random() > 0.5
    },
    reviewAuthorDetails: {
      name: faker.name.findName(),
      userPicture: `https://airbnb-reviews-users-pictures.s3-us-west-1.amazonaws.com/${Math.ceil(Math.random() * 3000)}.jpg`,
      userPageLink: faker.internet.url(),
      date: faker.date.recent(),
      reviewText: faker.lorem.paragraphs()
    }
  };
  // fakeReviewsArray.push(review);
  // console.log(`${i}. `);
  // console.log(review);
  // console.log('-----------------------------------------------');
  // console.log();

  const reviewEntry = new dbReviewModel.Review(review);

  reviewEntry.save((err, review) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${i}.`)
      console.log(`${reviewEntry._id} has been saved to the db.`);
    }
  });
}
