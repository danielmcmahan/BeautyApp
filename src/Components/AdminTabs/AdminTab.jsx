import React from 'react';

const AdminTab = ({ activeTab, children }) => {
    return (
        <div className={`tab-pane fade ${activeTab === "client-tab" && "show active"}`}>
            {children}
        </div>
    )
}

export default AdminTab
