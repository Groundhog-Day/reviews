import React from 'react';
import Reviews from './Reviews.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      stats: {}
    };

    axios.get(`/v1/api/${Math.floor(Math.random() * 9999999)}/accommodation`)
      .then((response) => {
        this.setState({ reviews: response.data.reviews })
        const stats = getStatsAndScores(response.data);

        this.setState({ stats: stats });


      })
      .catch((error) => { console.log('Could not get the data from the server', error) });
  }
  render() {
    return (<Reviews reviews={this.state.reviews} stats={this.state.stats} />);
  }
}

export default App;

function getStatsAndScores(data) {
  let res = {
    // General stats
    starAvg: 0.0,
    reviewsCount: data.reviews.length,
    // 6 scores
    communicationScore: data.communication,
    accuracyScore: data.accuracy,
    valueScore: data.value,
    checkinScore: data.checkIn,
    locationScore: data.location,
    cleanlinessScore: data.cleanliness
  };

  res.starAvg =
    res.communicationScore +
    res.accuracyScore +
    res.valueScore +
    res.checkinScore +
    res.locationScore +
    res.cleanlinessScore;
  res.starAvg /= 6;

  res.starAvg = res.starAvg.toFixed(2);


  return res;
}