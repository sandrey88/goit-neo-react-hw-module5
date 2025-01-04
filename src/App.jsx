import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import css from './App.module.css';

const API_KEY = 'hi3tckrY9DIPWSgjfMS29FoUyCEOW8f_NXL7oNwWL2E';
const BASE_URL = 'https://api.unsplash.com';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${BASE_URL}/search/photos`, {
          params: {
            query: searchQuery,
            page,
            per_page: 12,
            client_id: API_KEY,
          },
        });

        const newImages = response.data.results;
        setImages(prev => (page === 1 ? newImages : [...prev, ...newImages]));
        setHasMore(newImages.length === 12);
      } catch (error) {
        setError(error.message || 'Failed to fetch images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setHasMore(true);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleImageClick = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {loading && <Loader />}
      {!loading && !error && images.length > 0 && hasMore && (
        <div className={css.buttonContainer}>
          <LoadMoreBtn onClick={handleLoadMore} />
        </div>
      )}
      <ImageModal
        isOpen={modalImage !== null}
        onClose={closeModal}
        image={modalImage}
      />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
