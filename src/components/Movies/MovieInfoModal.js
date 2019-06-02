import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import { convertDate } from '../../utils/utils';
import PropTypes from 'prop-types';

const MovieInfoModal = (props) =>{
    let { title, name, overview, first_air_date, release_date} = props.movie;
    return (
        <Modal isOpen= {props.viewInfoModalOpen} >
                <ModalHeader close={<button className="close" onClick={props.closeInfoModal}>&times;</button>} > {title ? title : name} </ModalHeader>
                <ModalBody>
                    <div className ="container movies-container">
                        <p> <span className= "label"> Release Date : </span> {release_date ? convertDate(release_date) : convertDate(first_air_date)}</p>
                        <h6>Overview : </h6>
                        <p>{overview}</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.closeInfoModal}>OK</Button>
                </ModalFooter>
        </Modal>
    )
}

MovieInfoModal.propTypes = { 
    title: PropTypes.string, 
    name: PropTypes.string,
    closeInfoModal: PropTypes.func,
    overview : PropTypes.object,
    first_air_date : PropTypes.string,
    release_date : PropTypes.string 
} 

export default MovieInfoModal;