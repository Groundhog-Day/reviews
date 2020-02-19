const fs = require('fs');
const faker = require('faker');
//const dbReviewModel = require('./index.js');

const NUM_RECORDS = 10000000; //10 million
const MIN_REVIEWS = 4;
const MAX_REVIEWS = 7; //maximum reviews per accommodation

let turnLoggingOn = true;
let checkpoints = 100;
let checkpoint = 0;

let reviewIndex = 0;

//clean files
fs.writeFileSync('accommodations.csv', `"id","accuracy","communication","cleanliness","checkIn","value","location"\n`);
fs.writeFileSync('reviews.csv', `"id","accommodationId","userName","userPicture","userPageLink","date","reviewText","accuracy","communication","cleanliness","checkIn","value","location"\n`);

let beginGenerateRecords = function (i) { 

  let averages = {
    accuracy: 0,
    communication: 0,
    cleanliness: 0,
    checkIn: 0,
    value: 0,
    location: 0
  };

  let max = Math.floor(Math.random() * (MAX_REVIEWS - MIN_REVIEWS)) + MIN_REVIEWS;

  generateReviews(i, 0, max, averages);
};

let endGenerateRecords = function (i, max, avg) {
  let acsv = i + ',' +
          Math.round((avg['accuracy'] / max) * 100) / 100 + ',' +
          Math.round((avg['communication'] / max) * 100) / 100 + ',' +
          Math.round((avg['cleanliness'] / max) * 100) / 100 + ',' +
          Math.round((avg['checkIn'] / max) * 100) / 100 + ',' +
          Math.round((avg['value'] / max) * 100) / 100 + ',' +
          Math.round((avg['location'] / max) * 100) / 100 + '\n';

  if (turnLoggingOn) {
    let progress = Math.floor(NUM_RECORDS / checkpoints);
    if (i % progress === 0) {
      process.stdout.write("#");
      checkpoint++;
    }
  }

  fs.appendFile('accommodations.csv', acsv, 'utf8', function (err) {
    if (err) throw err;

    if (i + 1 < NUM_RECORDS) {
      beginGenerateRecords(i + 1);
    } else {
      console.log("\nscript complete");
    }
  });
}

let generateReviews = function (i, j, max, avg) {
  let accuracy = Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 100) / 100;
  let communication = Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 100) / 100;
  let cleanliness = Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 100) / 100;
  let checkIn = Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 100) / 100;
  let value = Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 100) / 100;
  let location = Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 100) / 100;

  avg['accuracy'] += accuracy;
  avg['communication'] += communication;
  avg['cleanliness'] += cleanliness;
  avg['checkIn'] += checkIn;
  avg['value'] += value;
  avg['location'] += location;

  vcsv = reviewIndex + ',' + 
            i + ',' +
            faker.name.findName() + ',' + 
            `"https://airbnb-reviews-users-pictures.s3-us-west-1.amazonaws.com/${Math.ceil(Math.random() * 3000)}.jpg"` + ',' + 
            faker.internet.url() + ',' + 
            faker.date.recent() + ',' + 
            faker.lorem.paragraph() + ',' + 
            accuracy + ',' + 
            communication + ',' + 
            cleanliness + ',' + 
            checkIn + ',' + 
            value + ',' + 
            location + '\n';

  reviewIndex++;

  fs.appendFile('reviews.csv', vcsv, 'utf8', function (err) {
    if (err) throw err;

    if (j + 1 < max) {
      generateReviews(i, j + 1, max, avg);
    } else {
      endGenerateRecords(i, max, avg);
    }
  });
};

beginGenerateRecords(0);