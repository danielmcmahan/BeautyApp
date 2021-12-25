import React from 'react'

const CancelBtn = ({ oncancel }) => {
    return (
        <button type="button" className="btn shadow-none action-toggler cancel" onClick={oncancel}>
            انصراف
        </button>
    )
}

export default CancelBtn
