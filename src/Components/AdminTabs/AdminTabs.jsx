import React, { useContext, useEffect, useState } from 'react';

// HOC
import Container from '../../HOC/Container';

//Component
import SearchBox from "../Common/SearchBox/SearchBox";
import SelectDoctor from "../Common/FormField/SelectDoctor";
import ClientTable from '../Common/ClientTable/ClientTable';
import UserTable from '../Common/UserTable/UserTable';
import ActionToggler from '../Common/ActionToggler/ActionToggler';
import AddUserPopup from '../Common/UserPopUp/AddUserPopUp';

import { ClientContext } from '../../Context/ClientContextProvider';
// import { UserContext } from '../../Context/UserContextProvider';

const AdminTabs = () => {
    const { addQueryForSearch, setAddQueryForSearch, _getClients, doctorIdForSearch, setDoctorIdForSearch } = useContext(ClientContext);
    // const { addQueryForUserSearch, setAddQueryForUserSearch, _getUsers } = useContext(UserContext);

    const [activeTab, setActiveTab] = useState("client-tab");
    const onClientTabClick = () => setActiveTab("client-tab");
    const onUserTabClick = () => setActiveTab("user-tab");

    const [isOpen, setIsOpen] = useState(false);
    const showPopUp = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const [searchLoading, setSearchLoading] = useState(false);
    // const [searchUserLoading, setSearchUserLoading] = useState(false);

    const onSearchBoxInputHandler = (e) => setAddQueryForSearch(e.target.value)

    // const onUserSearchBoxInputHandler = (e) => setAddQueryForUserSearch(e.target.value)

    const onChangeDoctorHandler = (e) => {
        const value = e.target.value;
        setDoctorIdForSearch(value);
        setSearchLoading(true);
    }

    const onSearchBtn = async () => {
        setSearchLoading(true);
        await _getClients(0);
        setSearchLoading(false);
    }

    // const onUserSearchBtn = async () => {
    //     setSearchUserLoading(true);
    //     await _getUsers(0);
    //     setSearchUserLoading(false);
    // }

    useEffect(() => {
        if (addQueryForSearch === "") _getClients(0)

    }, [addQueryForSearch]);

    // useEffect(() => {
    //     if (addQueryForUserSearch === "") _getUsers(0)

    // }, [addQueryForUserSearch]);

    useEffect(() => {
        (async function () {
            await _getClients(0);
            setSearchLoading(false);
        })()
    }, [doctorIdForSearch]);

    return (
        <Container>
            <AddUserPopup
                modalId="add-new-user"
                modalTitle="افزودن منشی"
                modalBtnText="افزودن"
                showModal={isOpen ? "active show" : ""}
                closeModal={closeModal}
            />
            <div className="row">
                <div className="col-12 text-center my-5">
                    <ul className="nav navigation">
                        <li className="nav-item">
                            <button
                                className={`btn shadow-none nav-link ${activeTab === "client-tab" && "active"}`}
                                onClick={onClientTabClick}
                            >
                                لیست بیماران
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`btn shadow-none nav-link ${activeTab === "user-tab" && "active"}`}
                                onClick={onUserTabClick}
                            >
                                لیست منشی ها
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="content">
                <div className="tab-content">
                    <div className={`tab-pane fade ${activeTab === "client-tab" && "show active"}`}>
                        <div className="row align-items-center justify-content-between mb-5">
                            <div className="col-12 col-md-6 col-lg-4 mb-2 mb-md-0">
                                <SearchBox InputSearchHandler={onSearchBoxInputHandler} ButtonSearchHandler={onSearchBtn} />
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 text-start common-form">
                                <SelectDoctor labelDisplay="d-none" changeEvent={onChangeDoctorHandler} />
                            </div>
                        </div>

                        <ClientTable reloadLoading={searchLoading} />
                    </div>
                    <div className={`tab-pane fade ${activeTab === "user-tab" && "show active"}`}>
                        <div className="row align-items-center justify-content-between mb-5">
                            <div className="col-12 col-md-6 col-lg-4 mb-2 mb-md-0">
                                {/* <SearchBox InputSearchHandler={onUserSearchBoxInputHandler} ButtonSearchHandler={onUserSearchBtn} /> */}
                            </div>
                            <div className="col-6 col-lg-3 text-start order-2 order-lg-3">
                                <ActionToggler
                                    targetModal="add-new-user"
                                    ico="plus-lg"
                                    modalHandler={showPopUp}
                                >
                                    افزودن منشی
                                </ActionToggler>
                            </div>
                        </div>

                        <UserTable />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default AdminTabs
