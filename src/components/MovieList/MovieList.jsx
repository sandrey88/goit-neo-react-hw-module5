import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const defaultImg = "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map(movie => (
        <li key={movie.id} className={css.movieItem}>
          <Link 
            to={`/movies/${movie.id}`} 
            state={{ from: location }}
            className={css.movieLink}
          >
            <img
              src={movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defaultImg
              }
              alt={movie.title}
              className={css.moviePoster}
            />
            <h3 className={css.movieTitle}>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
