import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import SearchForm from '../../components/SearchForm/SearchForm';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const data = await searchMovies(query);
        setMovies(data.results);
        if (data.results.length === 0) {
          setError('No movies found');
        } else {
          setError(null);
        }
      } catch (error) {
        setError('Failed to fetch movies');
        console.error(error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (value) => {
    setSearchParams({ query: value });
  };

  return (
    <div className={css.container}>
      <SearchForm onSubmit={handleSubmit} />
      {error && <div className={css.error}>{error}</div>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
