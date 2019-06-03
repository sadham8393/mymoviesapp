import { NOT_AVAILABLE } from './constants';

/**
 * Convert date format from "yyyy-mm-dd" to "dd/mm/yy"
 */

export function convertDate(date){
    if(date){
        return date.toString().split("-").reverse().join("/");
    }
    return NOT_AVAILABLE;
}


//Form the delete confirmation message
export function deleteMovieMessage(movieName) {
    return `Are you sure you want to delete ${movieName} ?`
}