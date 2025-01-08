import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError('Failed to fetch reviews');
        console.error(error);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (error) return <div className={css.error}>{error}</div>;
  if (reviews.length === 0) return <div className={css.message}>No reviews available</div>;

  return (
    <ul className={css.reviewsList}>
      {reviews.map(review => (
        <li key={review.id} className={css.reviewItem}>
          <h3 className={css.author}>Author: {review.author}</h3>
          <p className={css.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
