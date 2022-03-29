import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { CloseOutlined } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';

import './styles.css';

const ModalComponent = forwardRef(({children, additionalClass, closingModal = null}, ref) => {
    const [modalStatus, setModalStatus] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            openModal: () => {
                setModalStatus(true);
            },
            closeModal: () => {
                setModalStatus(false);
            }
        }
    }, []);

    return (
        <Modal className="modal_container" open={modalStatus} onClose={() => {closingModal(); setModalStatus(false)}}>
            <Box className={`modal ${additionalClass}`} >
                <button className="close_modal_button" onClick={() => {closingModal(); setModalStatus(false)}}>
                    <CloseOutlined style={{ color: "#000000" }}/> 
                </button>
                {children}
            </Box>
        </Modal>
    )
})

export default ModalComponent;