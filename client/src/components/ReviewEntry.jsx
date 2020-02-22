import React from 'react';
import styles from '../../dist/styles/styles.css';

const months = ['zero', 'January', 'February',
  'March', 'April', 'May',
  'June', 'July', 'August',
  'September', 'October', 'November', 'December'];

const ReviewEntry = ({ review }) => {
  // Creating nicely looking date:
  // From somthing like that: 2020-01-26T05:35:14.858Z
  // To something like that: January 2020
  const date = review.date.split('-')[0];

  return (
    <div className={styles.reviewEntry}>
      <div className={styles.reviewHeader}>
        <div className={styles.avatarContainer}>
          <img src={review.userPicture} alt="avatar" />
        </div>
        <div className={styles.authoringDetails}>
          <div className={styles.firstName}>{review.userName.split(' ')[0]}</div>
          <div className={styles.date}>{date}</div>
        </div>
      </div>
      <div className={styles.reviewText}>{String.fromCharCode.apply(null, review.reviewText.data)}</div>
    </div>
  );
};

export default ReviewEntry;