const express = require('express');
const dbReviewModel = require('../database/index.js');
const app = express();
const port = 2020;
const path = require('path');

app.use(express.static(path.join(__dirname, '../client/dist')));

//create
app.post(
  '/v1/api/:accommodationId/reviews',
  (req, res) => {
    
  }
);

//read
app.get(
  '/v1/api/:accommodationId/reviews',
  (req, res) => {
    dbReviewModel.getAllReviewsForSpecificHouse(
      (reviews) => {
        res.send(reviews)
      },
      req.params.accommodationId
    );
  }
)

//update
app.patch('/v1/api/:accommodationId/reviews/:reviewId',
  (req, res) => {
    
  }
);

//destroy
app.delete('/v1/api/:accommodationId/reviews/:reviewId',
  (req, res) => {
    
  }
);

app.listen(port, () => console.log(`Reviews server is listening on port ${port}!\n`))