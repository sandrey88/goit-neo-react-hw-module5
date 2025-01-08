import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../services/api';
import css from './MovieCast.module.css';

const defaultImg = "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchCast = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setCast(data.cast);
      } catch (error) {
        setError('Failed to fetch cast information');
        console.error(error);
      }
    };

    fetchCast();
  }, [movieId]);

  if (error) return <div className={css.error}>{error}</div>;
  if (cast.length === 0) return <div className={css.message}>No cast information available</div>;

  return (
    <ul className={css.castList}>
      {cast.map(actor => (
        <li key={actor.id} className={css.castItem}>
          <img
            src={actor.profile_path 
              ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
              : defaultImg
            }
            alt={actor.name}
            className={css.actorImage}
          />
          <div className={css.actorInfo}>
            <p className={css.actorName}>{actor.name}</p>
            <p className={css.character}>Character: {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
