import { fetchTrendingListApi, fetchMoviesApi, deleteTvMovieApi } from '../api/api'
import { put, call} from 'redux-saga/effects';
import {
    MOVIES_FETCHED_SUCCESS, MOVIES_FETCHED_ERROR, 
    MOVIES_FETCHED_NO_RESULTS, NO_RESULTS_FOUND, DELETE_MOVIE_SUCCESS, DELETE_MOVIE_FAILURE
} from '../utils/constants';

export function* fetchTrendingMovies(action) {
    let {pageNumber} = action;
    try {
        const payload = yield call(fetchTrendingListApi, pageNumber);
        yield put({ type: MOVIES_FETCHED_SUCCESS, moviesList: payload });
    } catch (error) {
        yield put({ type: MOVIES_FETCHED_ERROR, error });
    }
}

export function* fetchTvMovies(action) {
    try {
        const payload = yield call(fetchMoviesApi, action.queryParams);
        if(payload.total_results > 0){
            yield put({ type: MOVIES_FETCHED_SUCCESS, moviesList: payload });
        } else {
            yield put({ type: MOVIES_FETCHED_NO_RESULTS, moviesList: payload, info: NO_RESULTS_FOUND });
        }
    } catch (error) {
        yield put({ type: MOVIES_FETCHED_ERROR, error });
    }
}

export function* deleteTvMovie(action) {
    try {
      const { movieId, moviesList } = action;
      const payload = yield call(deleteTvMovieApi, movieId, moviesList);
      yield put({ type: DELETE_MOVIE_SUCCESS, moviesList: payload.moviesList, success: payload.message});
    } catch (error) {
      yield put({ type: DELETE_MOVIE_FAILURE, error:`Delete movies/tv failed. ${error.message}`});
    }
}