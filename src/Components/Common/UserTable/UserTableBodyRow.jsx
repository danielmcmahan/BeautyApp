import React from 'react';

const UserTableBodyRow = (props) => {
    const { col, name, username, modalTarget, modalHandler, userId } = props;

    return (
        <>
            <tr>
                <td>{col}</td>
                <td>{name}</td>
                <td>{username}</td>
                <td>
                    <button className="btn btn-outline-primary" onClick={modalHandler} id={modalTarget} data-userid={userId} type='button'>
                        <i className="bi bi-pencil align-middle"></i>
                    </button>
                </td>
            </tr>
        </>
    )
}

export default UserTableBodyRow;
