import React from 'react';
import { useNavigate } from "react-router-dom";

const ClientTableBodyRow = (props) => {
    const { id, col, name, nationalCode } = props;
    const navigate = useNavigate();

    return (
        <tr onClick={() => navigate(`/clients/${id}`)}>
            <td>{col}</td>
            <td>{name}</td>
            <td>{nationalCode}</td>
            {/* <td>
                <button className="btn btn-outline-danger">
                    <i className="bi bi-trash align-middle"></i>
                </button>
            </td> */}
        </tr>
    )
}

export default ClientTableBodyRow
