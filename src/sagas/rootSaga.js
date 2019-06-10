import * as moviesSaga from './MoviesSaga';
import { all, takeLatest} from 'redux-saga/effects';
import {
    FETCH_TRENDING_MOVIES, FETCH_TV_MOVIES, DELETE_TV_MOVIES
} from '../utils/constants';


export default function* rootSaga() {
    yield all([
        //Movies Saga
        takeLatest(FETCH_TRENDING_MOVIES, moviesSaga.fetchTrendingMovies),
        takeLatest(FETCH_TV_MOVIES, moviesSaga.fetchTvMovies),
        takeLatest(DELETE_TV_MOVIES, moviesSaga.deleteTvMovie)
    ]);
}