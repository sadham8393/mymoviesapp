import { fetchTrendingMovies, fetchTvMovies, deleteTvMovie} from '../../src/sagas/MoviesSaga';
import { MOVIES_FETCHED_SUCCESS, MOVIES_FETCHED_ERROR,MOVIES_FETCHED_NO_RESULTS, DELETE_MOVIE_SUCCESS, DELETE_MOVIE_FAILURE,NO_RESULTS_FOUND
}  from '../../src/utils/constants';
import { put, call} from 'redux-saga/effects';
import { fetchTrendingListApi, fetchMoviesApi, deleteTvMovieApi } from '../../src/api/api'

/**
 *  API testing
 */
describe('Movies/Tv sagas ', () => { 
    //Mock data for testing
    const mockData = [
      {
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
      },
      {
        "page": 1,
        "total_results": 0
      }
    ];
    const error = {error : "Something went wrong!"};

    const deleteSuccess =  { moviesList : mockData[0] , message : 'Success Hurray'};
    ;
    const action = {queryParams : { pageNumber : 1, tvMovieType : "All", searchterm : "Avengers"}, 
                    movieId : 299536, moviesList : mockData[0]};

    const noresultAction = {queryParams : { pageNumber : 1, tvMovieType : "All", searchterm : "father goose qwerrr"}, 
    movieId : 299536, moviesList : mockData[0]};
    
    /**
     *  Test cases for initial fetching of movies/tv
     */
    describe('fetchTrendingMovies() initial loading' , () => {
        const gen = fetchTrendingMovies(action.queryParams);
        it('should call the API', () => {
          let {pageNumber} = action.queryParams;
          expect(gen.next().value).toEqual(call(fetchTrendingListApi, pageNumber));
        });
        it('should dispatch a MOVIES_FETCHED_SUCCESS action if successful', () => {
          expect(gen.next(mockData[0]).value).toEqual(put({ type: MOVIES_FETCHED_SUCCESS, moviesList: mockData[0] }));
        });
        it('should dispatch a MOVIES_FETCHED_ERROR action if unsuccessful', () => {
          expect(gen.throw(error).value).toEqual(put({ type: MOVIES_FETCHED_ERROR, error}));
        });
        it('should be done', () => {
          expect(gen.next().done).toEqual(true);
        });
    });

    /**
     *  Test cases for searched movies/tv
     */
    describe('fetchTvMovies()', () => {
        const gen = fetchTvMovies(action);
        it('should call the API', () => {
          expect(gen.next().value).toEqual(call(fetchMoviesApi, action.queryParams));
        });
        it('should dispatch a MOVIES_FETCHED_SUCCESS action if successful', () => {
            expect(gen.next(mockData[0]).value).toEqual(put({ type: MOVIES_FETCHED_SUCCESS, moviesList: mockData[0] }));
        });
        it('should dispatch a MOVIES_FETCHED_ERROR action if unsuccessful', () => {
            expect(gen.throw(error).value).toEqual(put({ type: MOVIES_FETCHED_ERROR, error}));
        });
        it('should be done', () => {
          expect(gen.next().done).toEqual(true);
        });
    });

    describe('fetchTvMovies()', () => {
      const gen = fetchTvMovies(noresultAction);
      it('should call the API', () => {
        expect(gen.next().value).toEqual(call(fetchMoviesApi, noresultAction.queryParams));
      });
      it('should dispatch a MOVIES_FETCHED_NO_RESULTS action if successful', () => {
        expect(gen.next(mockData[1]).value).toEqual(put({ type: MOVIES_FETCHED_NO_RESULTS, moviesList: mockData[1], info: NO_RESULTS_FOUND }));
      });
    });

    /**
     *  Test cases for delete movies/tv
     */
    describe('deleteTvMovie()', () => { 
        const gen = deleteTvMovie(action);
        const { movieId, moviesList } = action;
        it('should call the API', () => {
            expect(gen.next().value).toEqual(call(deleteTvMovieApi, movieId, moviesList));
        });
        it('should dispatch a DELETE_MOVIE_SUCCESS action if successful', () => {
            expect(gen.next(deleteSuccess).value).toEqual(put({ type: DELETE_MOVIE_SUCCESS, moviesList: mockData[0], success: deleteSuccess.message }));
        });

        it('should dispatch a DELETE_MOVIE_FAILURE action if successful', () => {
            expect(gen.throw({ error : "Delete movies/tv failed. undefined"}).value).toEqual(put({ type: DELETE_MOVIE_FAILURE, error: "Delete movies/tv failed. undefined"}));
        });
    });
});