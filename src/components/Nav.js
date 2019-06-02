import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) =>{
    return (
      <nav className = "navbar" >
        <div className="nav-wrapper nav-header">
          <h2 className="brand-logo" onClick = {props.onHeaderClick} > My Movies App </h2>
        </div>
      </nav>
    )
}

Header.propTypes = { 
  onHeaderClick: PropTypes.func
} 
export default Header;