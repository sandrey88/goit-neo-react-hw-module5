import { useState, useEffect } from 'react';
import { getTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError('Failed to fetch trending movies');
        console.error(error);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (error) return <div className={css.error}>{error}</div>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending Today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
