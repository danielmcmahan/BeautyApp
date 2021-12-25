import React from 'react'

const ActionToggler = (props) => {
    const {
        targetModal,
        modalHandler,
        ico
    } = props;

    return (
        <button
            type="button"
            className="btn shadow-none mb-2 action-toggler"
            data-bs-target={`#${targetModal}`}
            onClick={modalHandler}
        >
            <i className={`bi bi-${ico} ms-1 align-middle mb-1`}></i>
            {props.children}
        </button>
    )
}

export default ActionToggler
