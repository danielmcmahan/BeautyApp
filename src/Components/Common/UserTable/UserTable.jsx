import React, { useContext, useState } from 'react';

import { UserContext } from '../../../Context/UserContextProvider';

import UserTableBodyRow from './UserTableBodyRow';
import UserTableHeading from './UserTableHeading';
import ReactLoading from 'react-loading';
import UpdateUserPopup from '../UserPopUp/UpdateUserPopUp';

const UserTable = ({ reloadLoading }) => {
    const { allUser, loading } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const showPopUp = (e) => {
        setIsOpen(true);
        if (e.currentTarget.dataset.userid !== undefined && e.currentTarget.dataset.userid !== null)
            setCurrentUserId(e.currentTarget.dataset.userid)
    };

    const closeModal = () => setIsOpen(false);

    return (
        <>

            <UpdateUserPopup
                modalId="update-user-info"
                modalTitle="تغییر مشخصات منشی"
                modalBtnText="ویرایش"
                showModal={isOpen ? "active show" : ""}
                closeModal={closeModal}
                currentUserId={currentUserId}
            />

            <div className="d-flex justify-content-center mt-5 mb-5">
                {
                    loading ?
                        <ReactLoading type="spinningBubbles" color="#1f3c88" height={60} width={60} /> :
                        allUser.length ?
                            <table className="table table-responsive table-striped text-center" >
                                <UserTableHeading
                                    head_1="نام منشی"
                                    head_2="نام کاربری"
                                    head_3="عملیات"
                                >
                                    {
                                        reloadLoading &&
                                        <div className='reload-loading'>
                                            <div className="linear-activity">
                                                <div className="indeterminate"></div>
                                            </div>
                                        </div>
                                    }
                                </UserTableHeading>
                                <tbody>
                                    {allUser.map((item, index) => (
                                        <UserTableBodyRow
                                            key={item.id}
                                            col={++index}
                                            name={item.name}
                                            username={item.username}
                                            modalTarget="update-user-info"
                                            modalHandler={showPopUp}
                                            userId={item.id}
                                        />
                                    ))}
                                </tbody>
                            </table> :
                            <div className="alert alert-warning w-100 text-center">منشی ثبت نشده است.</div>
                }
            </div>
        </>
    )
}

export default UserTable
