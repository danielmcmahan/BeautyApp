import React, { useContext } from 'react';

import ActionToggler from '../../Components/Common/ActionToggler/ActionToggler';
import MainTitle from '../../Components/Common/MainTitle/MainTitle';
import ClientPopUp from '../../Components/Common/ClientPopUp/ClientPopUp';
import SearchBox from '../../Components/Common/SearchBox/SearchBox';
import ClientTable from '../../Components/Common/ClientTable/ClientTable';

// container
import Container from '../../HOC/Container';
import MainContent from "../../HOC/MainContent";

// modal context
import { ModalContext } from '../../Context/ModalContextProvider';



const Secratory = () => {
    const { isOpen, closeModal, showPopUp } = useContext(ModalContext);

    return (
        <Container>
            <ClientPopUp
                modalId="add-new-client"
                modalTitle="افزودن زیباجو"
                modalBtnText="افزودن"
                showModal={isOpen ? "active show" : ""}
                closeModal={closeModal}
            />

            <MainContent>
                <div className="row align-items-center mb-5">
                    <div className="col-6 col-lg-3 order-1">
                        <MainTitle title="لیست زیباجویان" />
                    </div>
                    <div className="col-12 col-lg-6 order-3 order-lg-2">
                        <SearchBox />
                    </div>
                    <div className="col-6 col-lg-3 text-start order-2 order-lg-3">
                        <ActionToggler
                            targetModal="add-new-client"
                            ico="plus-lg"
                            modalHandler={showPopUp}
                        >
                            افزودن
                        </ActionToggler>
                    </div>
                </div>

                <ClientTable />
            </MainContent>
        </Container>
    )
}

export default Secratory
