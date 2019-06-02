import React from 'react';
import PropTypes from 'prop-types';

const Alert = (props) =>{
    return (
        <nav className = {`${props.alertClass} alert-container`}>
            <div className="nav-wrapper">
            <ul className="left">
                <h5>{props.alertMessage}</h5>
            </ul>
            <ul className="right">
                <i className="small material-icons alert-close-btn " onClick = {props.alertClose}> close </i>
            </ul>
            </div>
        </nav>
    )
}

Alert.propTypes = { 
    alertClass: PropTypes.string, 
    alertMessage: PropTypes.string,
    alertClose: PropTypes.func
} 

export default Alert;