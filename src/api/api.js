import { REACT_MOVIEDB_API_KEY, MOVIEDB_PATH, TRENDING_DAY_URL} from '../utils/constants';
import axios from 'axios';


export function fetchTrendingListApi(pageNumber) {
    return axios.get(`${MOVIEDB_PATH}${TRENDING_DAY_URL}${REACT_MOVIEDB_API_KEY}&page=${pageNumber}`).then(response => response.data );
}

export function fetchMoviesApi({tvMovieType, searchterm, pageNumber }) {
    return axios.get(`${MOVIEDB_PATH}search/${tvMovieType}${REACT_MOVIEDB_API_KEY}&query=${searchterm}&page=${pageNumber}`).then(response => response.data );
}

export function deleteTvMovieApi(movieId, moviesList) {
    var movieName;
    let moviesResult = moviesList.results;
    let movies = moviesResult.filter(function(item) { 
        if(item.id === movieId){
            let {title, name} = item;
            movieName = title ? title : name;
        }
        return item.id !== movieId
    });

    moviesList.results = movies;

    return { moviesList : moviesList , message : `${movieName} deleted successfully`};
}

