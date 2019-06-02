import {
    FETCH_TRENDING_MOVIES, FETCH_TV_MOVIES, RESET_RESPONSE, DELETE_TV_MOVIES
} from '../../src/utils/constants';

import * as moviesAction from '../../src/actions/moviesAction';

/**
 * Movies action test cases
 */
describe('Movies actions', () => {
    //Initial loading of movies test case
    describe('getTrendingList', () => {
        it('should return the initial current trending movies/tv list ', () => {
              expect(moviesAction.getTrendingList()).toEqual({
                  type: FETCH_TRENDING_MOVIES
              });
        });
    });

    //Searched movies/tv test case
    describe('getMoviesList', () => {
        it('should return the searched movies list', () => {
              expect(moviesAction.getMoviesList()).toEqual({
                  type: FETCH_TV_MOVIES
              });
        });
    });

    //Delete movies/tv test case
    describe('deleteTvMovies', () => {
        it('should delete the selected movie/tv from the list', () => {
              expect(moviesAction.deleteTvMovie()).toEqual({
                  type: DELETE_TV_MOVIES
              });
        });
    });

    describe('resetResponse', () => {
        it('should return the responses to empty', () => {
              expect(moviesAction.resetResponse()).toEqual({
                  type: RESET_RESPONSE
              });
        });
    });
});

