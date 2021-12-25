import React from 'react'

import FormOfAddingClient from '../Form/FormOfAddingClient';

const PopUp = (props) => {
    const { modalId, modalTitle, modalBtnText, showModal, closeModal } = props;

    return (
        <div className={`modal fade ${showModal}`} id={modalId} onClick={closeModal}>
            <div className="modal-dialog flex-column justify-content-center align-items-start">
                <button className="btn shadow-none close text-white" onClick={closeModal}>
                    <i className="bi bi-x-lg"></i>
                </button>
                <div className="modal-content" onClick={event => event.stopPropagation()}>
                    <div className="modal-body p-4 common-form">
                        <h4 className="mb-5 mt-3 text-center">{modalTitle}</h4>
                        <FormOfAddingClient modalBtnText={modalBtnText} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUp
