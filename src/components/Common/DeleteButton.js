import React from 'react';
import PropTypes from 'prop-types';

const DeleteButton = (props) =>{
    return (
        <button className = "waves-effect waves-light btn-small deleteBtn" onClick = {() => props.onDeleteClick(props.movie)}> Delete </button>
    )
}

DeleteButton.propTypes = { 
    movie: PropTypes.object, 
    onDeleteClick: PropTypes.func
} 

export default DeleteButton;