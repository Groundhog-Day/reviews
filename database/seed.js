const fs = require('fs');
const readline = require('readline');
const dbAccommodationModel = require('./index.js');

const readAccommodations = readline.createInterface({
    input: fs.createReadStream('./accommodations.csv'),
    output: null,
    console: false
});

const NUM_RECORDS = 10000000;

const turnLoggingOn = true;
let checkpoints = 100;
let checkpoint = 0;
let accommodationsIndex = 0;

const modelA = dbAccommodationModel.Accommodation;

readAccommodations.on('line', function(line) {
  const arr = line.split(',');

  if (accommodationsIndex < 1) {
    accommodationsIndex++;
    process.stdout.write("#");
    return;
  }

  const accommodationEntry = new modelA({
    "id": accommodationsIndex,
    "accuracy": arr[0],
    "communication": arr[1],
    "cleanliness": arr[2],
    "checkIn": arr[3],
    "value": arr[4],
    "location": arr[5]
  });

  accommodationEntry.save((err, accommodation) => {
    if (err) {
      console.log(err);
    }
  });

  if (turnLoggingOn) {
    let progress = Math.floor(NUM_RECORDS / checkpoints);
    if (accommodationsIndex % progress === 0) {
      process.stdout.write("#");
      checkpoint++;
    }
  }
  accommodationsIndex++;
});

readAccommodations.on('close', function(line) {
    console.log('Seeding script complete!');
});
