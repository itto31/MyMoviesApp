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

export function getSimilarMovies(id) {
  const url = `${API_MOVIE}/movie/${id}/similar?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
    .then((respose) => {
      return respose.json();
    })
    .then((result) => {
      return result;
    });
}

export function getSearchMovie(movie) {
  const url = `${API_MOVIE}/search/movie/?api_key=${API_KEY}&language=${LANG}&sort_by=popularity.asc&query=${movie}`;

  return fetch(url)
    .then((respone) => {
      return respone.json();
    })
    .then((result) => {
      return result;
    });
}
