import React from 'react';
import Container from '../../../HOC/Container';
import DoctorInfo from '../../DoctorInfo/DoctorInfo';
import DoctorOperation from '../../DoctorOperation/DoctorOperation';
import Notification from '../../Notification/Notification';

const Header = () => {
    return (
        <Container>
            <div className="header">
                <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                    <DoctorInfo />
                    <DoctorOperation />
                </div>
                <Notification />
            </div>
        </Container>
    )
}

export default Header
