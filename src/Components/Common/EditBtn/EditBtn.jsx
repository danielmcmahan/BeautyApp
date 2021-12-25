import React from 'react'

const EditBtn = ({ margin, onedit, handleClass }) => {
    return (
        <button type="button" className={`btn shadow-none action-toggler ${margin} ${handleClass}`} onClick={onedit}>
            <i className="bi bi-pencil-square ms-2 align-middle"></i>
            ویرایش
        </button>
    )
}

export default EditBtn
