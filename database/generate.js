const fs = require('fs');
const faker = require('faker');
//const dbReviewModel = require('./index.js');

const NUM_RECORDS = 10000000; //10 million
const MIN_REVIEWS = 75;
const MAX_REVIEWS = 120; //maximum reviews per accommodation

let first = true; //idk why i need this but i do
let second = true;

//clean files
fs.writeFileSync('accommodations.json', '', 'utf8', function (err) {
  if (err) throw err;
});
fs.writeFileSync('reviews.json', '', 'utf8', function (err) {
  if (err) throw err;
});

let ajson = '['; //accommodations json file
let vjson = '['; //reviews json file

for (let i = 0; i < NUM_RECORDS; i++) {
  let avgAccuracy = 0;
  let avgCommunication = 0;
  let avgCleanliness = 0;
  let avgCheckIn = 0;
  let avgValue = 0;
  let avgLocation = 0;
  ajson += '{"id":"' + i + '",';

  let max = Math.floor(Math.random() * (MAX_REVIEWS - MIN_REVIEWS)) + MIN_REVIEWS;

  for (let j = 0; j < max; j++) {
    let accuracy = Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 100) / 100;
    let communication = Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 100) / 100;
    let cleanliness = Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 100) / 100;
    let checkIn = Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 100) / 100;
    let value = Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 100) / 100;
    let location = Math.round(((Math.random() * 5) + Number.EPSILON + 0.1) * 100) / 100;

    avgAccuracy += accuracy;
    avgCommunication += communication;
    avgCleanliness += cleanliness;
    avgCheckIn += checkIn;
    avgValue += value;
    avgLocation += location;

    vjson += '{"id":"' + j + '","accommodationId":"' + i + '",' +
              '"userName":"' + faker.name.findName() + '",' + 
              '"userPicture":"' + `https://airbnb-reviews-users-pictures.s3-us-west-1.amazonaws.com/${Math.ceil(Math.random() * 3000)}.jpg` + '",' + 
              '"userPageLink":"' + faker.internet.url() + '",' + 
              '"date":"' + faker.date.recent() + '",' + 
              '"reviewText":"' + faker.lorem.paragraph() + '",' + 
              '"accuracy":"' + accuracy + '",' + 
              '"communication":"' + communication + '",' + 
              '"cleanliness":"' + cleanliness + '",' + 
              '"checkIn":"' + checkIn + '",' + 
              '"value":"' + value + '",' + 
              '"location":"' + location + '"}';

    if (i < NUM_RECORDS - 1 && j < max - 1) {
      vjson += ',';
    } else {
      vjson += ']';
    }

    fs.appendFileSync('reviews.json', (second) ? '' : vjson);
    second = false;
  }

  ajson += '"accuracy":"' + Math.round((avgAccuracy / max) * 100) / 100 + '",' +
           '"communication":"' + Math.round((avgCommunication / max) * 100) / 100 + '",' +
           '"cleanliness":"' + Math.round((avgCleanliness / max) * 100) / 100 + '",' +
           '"checkIn":"' + Math.round((avgCheckIn / max) * 100) / 100 + '",' +
           '"value":"' + Math.round((avgValue / max) * 100) / 100 + '",' +
           '"location":"' + Math.round((avgLocation / max) * 100) / 100 + '"}'


  if (i < NUM_RECORDS - 1) {
    ajson += ',';
  } else {
    ajson += ']';
  }

  fs.appendFileSync('accommodations.json', (first) ? '' : ajson);
  first = false;
}