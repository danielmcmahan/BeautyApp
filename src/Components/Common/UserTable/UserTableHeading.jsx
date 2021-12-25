import React from 'react';

const UserTableHeading = (props) => {
    const { head_1, head_2, head_3, children } = props;

    return (
        <thead>
            <tr>
                <th>ردیف</th>
                <th>{head_1}</th>
                <th>{head_2}</th>
                <th>{head_3}</th>
            </tr>
            <tr>
                <td className='p-0 border-0'>
                    {children}
                </td>
            </tr>
        </thead>
    )
}

export default UserTableHeading;
