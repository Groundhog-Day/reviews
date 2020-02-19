const fs = require('fs');
const faker = require('faker');
//const dbReviewModel = require('./index.js');
const gen = require('./generate.js');

var iterations = 10000;
console.time('Speed of Math.Random()');
for(var i = 0; i < iterations; i++ ) {
  Math.random() * .5;
};
console.timeEnd('Speed of Math.Random()');

console.time('Speed of fs.writefileSync()');
for(var i = 0; i < iterations; i++ ) {
  fs.writeFileSync('empty.json', '');
};
console.timeEnd('Speed of fs.writefileSync()');

console.time('Speed of json generation script');
for(var i = 0; i < iterations; i++ ) {
  gen.beginGenerateRecords(0);
};
console.timeEnd('Speed of json generation script');





