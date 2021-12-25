import React from 'react'

const ClientTableHeading = (props) => {
    const { head_1, head_2, children } = props;

    return (
        <thead className='position-relative'>
            <tr>
                <th>ردیف</th>
                <th>{head_1}</th>
                <th>{head_2}</th>
            </tr>
            <tr>
                <td className='p-0 border-0'>
                    {children}
                </td>
            </tr>
        </thead>
    )
}

export default ClientTableHeading
