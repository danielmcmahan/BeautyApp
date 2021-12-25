import React from 'react';
import AdminTabs from '../../Components/AdminTabs/AdminTabs';
import MainContent from '../../HOC/MainContent';

const Admin = () => {
    return (
        <>
            <MainContent>
                <AdminTabs />
            </MainContent>
        </>
    )
}

export default Admin
