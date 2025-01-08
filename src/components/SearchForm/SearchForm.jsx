import { useState } from 'react';
import css from './SearchForm.module.css';

const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSubmit(query);
    setQuery('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
