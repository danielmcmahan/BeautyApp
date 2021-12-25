import React from 'react';

// Components
import ClientPersonalInfo from "./ClientPersonalInfo";
import ClientVisitStatus from "./ClientVisitStatus";

// HOC
import Container from '../../../HOC/Container';
import MainContent from '../../../HOC/MainContent';
import ClientSurgeryStatus from './ClientSurgeryStatus';
import ClientNote from './ClientNote';


const ClientWrapper = () => {
    return (
        <Container>
            <MainContent>
                <ClientPersonalInfo />
                <ClientVisitStatus />
                <ClientSurgeryStatus />
                <ClientNote />
            </MainContent>
        </Container>
    )
}

export default ClientWrapper;
