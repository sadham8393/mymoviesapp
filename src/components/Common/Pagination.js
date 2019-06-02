import React from 'react';
import Pagination from "react-js-pagination";
import PropTypes from 'prop-types';

const PaginationComponent = (props) =>{
    return (
        <div className ="container movies-container">
            <div className = "row">
                <div className = "col s4">
                    <Pagination
                        activePage={props.currentPage}
                        itemsCountPerPage={20}
                        totalItemsCount={props.totalCount}
                        pageRangeDisplayed={10}
                        onChange={props.nextPage}
                        prevPageText={"Prev"}
                        firstPageText={"First"}
                        lastPageText={"Last"}
                        nextPageText={"Next"}
                    />
                </div>
            </div>
        </div>
    )
}

PaginationComponent.propTypes = { 
    currentPage: PropTypes.number, 
    totalCount: PropTypes.number,
    nextPage: PropTypes.func
} 

export default PaginationComponent;