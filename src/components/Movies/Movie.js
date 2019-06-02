import React from 'react';
import { MOVIEDB_IMAGE_APPEND_URL, NO_IMAGE_URl} from '../../utils/constants';
import DeleteButton from '../Common/DeleteButton';
import PropTypes from 'prop-types';

const Movie = (props) =>{
    let image = props.image ? <img className = "movie-img" src = {`${MOVIEDB_IMAGE_APPEND_URL}${props.image}`} alt = {props.movieTitle} />
                                     : <img className = "movie-img" src = {NO_IMAGE_URl} alt = {props.movieTitle} />;
    return (
        <div className = "col s12 m6 l3 movies-card">
            <div className = "card">
                <div className="card-image waves-effect waves-block waves-light">
                    {
                        image
                    }
                </div>
            </div>
            <div className="card-content">
                <button className="waves-effect waves-light btn-small overview" onClick = {() => props.viewInfoModal(props.movie) }>  Overview </button>
                <DeleteButton movie = {props.movie} onDeleteClick = {props.onDeleteClick}/>
            </div>
        </div>
    )
}

Movie.propTypes = { 
    image: PropTypes.string, 
    movieTitle: PropTypes.string,
    onDeleteClick: PropTypes.func,
    movie : PropTypes.object
} 

export default Movie;