import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404</h1>
      <p className={css.text}>Sorry, page not found</p>
      <Link to="/" className={css.link}>
        Go to Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
