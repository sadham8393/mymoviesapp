import {
    FETCH_TRENDING_MOVIES, FETCH_TV_MOVIES, MOVIES_FETCHED_SUCCESS, MOVIES_FETCHED_ERROR, MOVIES_FETCHED_NO_RESULTS, 
    RESET_RESPONSE,DELETE_TV_MOVIES, DELETE_MOVIE_SUCCESS, DELETE_MOVIE_FAILURE, NO_RESULTS_FOUND
} from '../../src/utils/constants';

import moviesReducer from '../../src/reducer/moviesReducer';

describe('moviesReducer', () => {
    // Mock data for testing
    const mockData = {
            "page": 1,
            "results": [
              {
                "adult": false,
                "backdrop_path": "/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",
                "genre_ids": [ 28, 12, 14, 878],
                "id": 299536,
                "original_language": "en",
                "original_title": "Avengers: Infinity War",
                "overview": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
                "poster_path": "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
                "release_date": "2018-04-25",
                "title": "Avengers: Infinity War",
                "video": false,
                "vote_average": 8.3,
                "vote_count": 6937,
                "popularity": 358.799
              }
            ],
            "total_pages": 1,
            "total_results": 1
    };

    // Initial state test case
    it('returns the initial state', () => {
        expect(moviesReducer(undefined, {})).toEqual({
            isLoading: false
        });
    });

    // Initial fetching test case
    it('should handle initial "FETCH_TRENDING_MOVIES', () => {
        expect(moviesReducer({}, { type: FETCH_TRENDING_MOVIES })).toEqual({ isLoading: true })
    });

    //Fetch success test case
    it('should handle MOVIES_FETCHED_SUCCESS', () => {
        const successAction = {
          type: MOVIES_FETCHED_SUCCESS,
          moviesList: mockData 
        };
        expect(moviesReducer({}, successAction)).toEqual({ isLoading: false , moviesList :mockData});
    });

    //Fetch faliure test case
    it('should handle LOCATION_RECEIVE_FAILED', () => {
        const failureAction = {
          type: MOVIES_FETCHED_ERROR,
          error: { success: false } 
        };
        expect(moviesReducer({}, failureAction)).toEqual({ isLoading: false , error: { success: false } });
    });

    //Fetch searched movies/tv test cases
    it('should handle "FETCH_TV_MOVIES', () => {
        expect(moviesReducer({}, { type: FETCH_TV_MOVIES })).toEqual({ isLoading: true })
    });

    //Delete movies/tv test case
    it('should handle "DELETE_TV_MOVIES', () => {
        expect(moviesReducer({}, { type: DELETE_TV_MOVIES })).toEqual({ isLoading: true })
    });

    //Delete Success test case
    it('should handle DELETE_MOVIE_SUCCESS', () => {
        const successAction = {
          type: DELETE_MOVIE_SUCCESS,
          moviesList: mockData,
          success : "Movie deleted Successfully"
        };
        expect(moviesReducer({}, successAction)).toEqual({ 
            isLoading: false , moviesList :mockData, success : "Movie deleted Successfully"
        });
    });

    //Delete failure test case
    it('should handle DELETE_MOVIE_FAILURE', () => {
        const failureAction = {
          type: DELETE_MOVIE_FAILURE,
          moviesList: mockData,
          error: { success: false } 
        };
        expect(moviesReducer({}, failureAction)).toEqual({ 
            isLoading: false , moviesList :mockData, error: { success: false } 
        });
    });

    //No results test case
    it('should handle MOVIES_FETCHED_NO_RESULTS', () => {
        const successAction = {
          type: MOVIES_FETCHED_NO_RESULTS,
          moviesList: mockData,
          info: NO_RESULTS_FOUND
        };
        expect(moviesReducer({}, successAction)).toEqual({ 
            isLoading: false , moviesList :mockData, info: NO_RESULTS_FOUND
        });
    });
    
    it('should handle RESET_RESPONSE', () => {
        const successAction = {
            type : RESET_RESPONSE,
            isLoading: false,
            error: null,  
            info : null,
            moviesList: null,
            success : null
        };
        expect(moviesReducer({}, successAction)).toEqual({ 
            isLoading: false , error: null, info : null, moviesList: null, success : null
        });
    });
});