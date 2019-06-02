import React from 'react';
import PropTypes from 'prop-types';

import {INPUT_TYPE_TEXT, INPUT_TYPE_SELECT} from '../utils/constants'

const SearchField = (props) =>{
    return (
        <div className ="container search-container">
            <form action = "" onSubmit = {props.handleSearch} className="row" >
                <div className="input-field col s4">
                    <input placeholder="Search Movie/Tv" className = "validate" id="searchInput" type="text" 
                            name = "searchterm" onChange = {(e) => props.handleChange(e, INPUT_TYPE_TEXT)} required/>
                    <span className="helper-text" data-error="Please enter Movie/Tv Series and Search." ></span>
                </div>
                
                <div className="input-field col s2">
                    <select className="browser-default" name = "tvMovieType" onChange = {(e) => props.handleChange(e, INPUT_TYPE_SELECT)}>
                    <option value="" disabled defaultValue>Search By</option>
                    <option value="multi">All</option>
                    <option value="movie">Movie</option>
                    <option value="tv">TV</option>
                    </select>
                </div>

                <div className="input-field col s2">
                    <button className="waves-effect waves-light btn" disabled = {props.searchBtnDisabled} onClick = {props.handleSearch}><i className="material-icons right">search</i>Search</button>
                </div>
            </form>
        </div>
    )
}

SearchField.propTypes = { 
    handleSearch: PropTypes.func,
    handleChange : PropTypes.func,
    searchBtnDisabled : PropTypes.bool

} 
export default SearchField;