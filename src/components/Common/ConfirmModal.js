import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

const ConfirmModal = (props) =>{
    return (
        <Modal centered isOpen={props.confirmModalOpen} className = "confirmModal">
            <ModalHeader>{props.title}</ModalHeader>
            <ModalBody>
                {props.confirmMessage}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={props.onYesClick}>Yes</Button>
                <Button color="secondary" onClick={props.onNoClick}>No</Button>
            </ModalFooter>
        </Modal>
    );     
}

ConfirmModal.propTypes = { 
    confirmModalOpen: PropTypes.bool, 
    title:PropTypes.string,
    confirmMessage:PropTypes.string,
    onYesClick: PropTypes.func,
    onNoClick: PropTypes.func
}

export default ConfirmModal;