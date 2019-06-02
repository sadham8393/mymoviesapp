import {
    FETCH_TRENDING_MOVIES, FETCH_TV_MOVIES, RESET_RESPONSE, DELETE_TV_MOVIES
} from '../utils/constants';

export const getTrendingList = (pageNumber) => ({
    type: FETCH_TRENDING_MOVIES,
    pageNumber
});

export const getMoviesList = (queryParams) => ({
    type: FETCH_TV_MOVIES,
    queryParams
});

export const deleteTvMovie = (movieId, moviesList) => ({
    type: DELETE_TV_MOVIES,
    movieId,
    moviesList
});

export const resetResponse = () => {
    return {
        type: RESET_RESPONSE
    };
}