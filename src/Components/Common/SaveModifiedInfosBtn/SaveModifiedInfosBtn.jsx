import React from 'react';

const SaveModifiedInfosBtn = ({ margin, updateCientInfo }) => {
    return (
        <button
            type="submit"
            className={`btn shadow-none action-toggler action-toggler-fill save ${margin}`}
            onClick={updateCientInfo}
        >
            ذخیره تغییرات
        </button>
    )
}

export default SaveModifiedInfosBtn;
