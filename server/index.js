require('newrelic');
const express = require('express');
const dbReviewModel = require('../database/index.js');
const app = express();
const port = 2020;
const path = require('path');

app.use(express.static(path.join(__dirname, '../client/dist')));

//create
app.post(
  '/v1/api/reviews',
  (req, res) => {
    dbReviewModel.newReview(
      (id1, id2) => {
        console.log('New review posted\naccommodation id: ' +
          id1 +
          '\nreview id: ' + id2);

        res.end();
      },
      req.params.accommodationId,
      req.body
    );
  }
);

//read
app.get(
  '/v1/api/:accommodationId/accommodation',
  (req, res) => {
    //console.time('Speed of getAccommodation()');
    dbReviewModel.getAccommodation(
      (accommodation) => {
        res.send(accommodation);
        //console.timeEnd('Speed of getAccommodation()');
      },
      req.params.accommodationId
    );
  }
)

//update
app.patch('/v1/api/:reviewId/reviews',
  (req, res) => {
    dbReviewModel.updateReview(
      () => { res.end() },
      req.params.reviewId,
      req.body
    );
  }
);

//destroy
app.delete('/v1/api/:reviewId/reviews',
  (req, res) => {
    dbReviewModel.deleteReview(
      () => {
        console.log('Review deleted\nreview id: ' + req.params.reviewId);

        res.end();
      },
      req.params.reviewId
    );
  }
);

app.listen(port, () => console.log(`Reviews server is listening on port ${port}!\n`))