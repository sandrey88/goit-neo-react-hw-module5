import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODg2ZDNhYWMwMjJkZTg2MWU5NWU1YjRiMTQ0Zjg2YyIsIm5iZiI6MTczNjI5MjIxMS4yNzMsInN1YiI6IjY3N2RiNzczNjFhODczOTUyYzdhZjUxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eYyOL3TYoNrin1CmLXs7sS0KX9ptSmGHkEi-Lx7EJHU';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getTrendingMovies = async () => {
  const response = await axiosInstance.get('/trending/movie/day');
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await axiosInstance.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`);
  return response.data;
};

export const getMovieReviews = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
  return response.data;
};
