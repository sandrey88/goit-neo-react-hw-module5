import { useState, useEffect, useRef } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import css from './MovieDetailsPage.module.css';

const defaultImg = "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError('Failed to fetch movie details');
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (error) return <div className={css.error}>{error}</div>;
  if (!movie) return null;

  const { 
    title, 
    release_date, 
    vote_average, 
    overview, 
    genres, 
    poster_path 
  } = movie;

  return (
    <div className={css.container}>
      <Link to={backLink.current} className={css.backLink}>
        ← Go back
      </Link>

      <div className={css.movieInfo}>
        <img
          src={poster_path 
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : defaultImg
          }
          alt={title}
          className={css.poster}
        />
        
        <div className={css.details}>
          <h2>{title} ({release_date?.split('-')[0]})</h2>
          <p>User Score: {Math.round(vote_average * 10)}%</p>
          
          <h3>Overview</h3>
          <p>{overview}</p>
          
          <h3>Genres</h3>
          <p>{genres?.map(genre => genre.name).join(', ')}</p>

          <div className={css.additional}>
            <h3>Additional information</h3>
            <ul className={css.additionalList}>
              <li>
                <Link to="cast" className={css.link}>Cast</Link>
              </li>
              <li>
                <Link to="reviews" className={css.link}>Reviews</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
