import { API_MOVIE, API_KEY, LANG } from '../utils/constant';

export function getPopularMovies(page = 1) {
  const url = `${API_MOVIE}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`;

  return fetch(url)
    .then((respone) => {
      return respone.json();
    })
    .then((result) => {
      return result;
    });
}

export function getMovieById(id) {
  const url = `${API_MOVIE}/movie/${id}?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
}