import React, { createContext, useState } from 'react';

export const ClientInfos = createContext();

const PostClientInfoContextProvider = ({ children }) => {
    const [isChanged, setIsChanged] = useState(false);
    const [info, setInfo] = useState({
        id: "",
        name: "",
        nationalCode: "",
        doctorId: "",
        historyOfSurgery: "",
        historyOfDrugUse: "",
        phone: "",
        age: ""
    });

    const onPostInfoChanges = ((event, error, validateDate) => {
        setInfo({
            ...info,
            [event.target.name]: event.target.value
        });

        setIsChanged(true);
        error && delete error[event.target.name];
        validateDate && validateDate();
    });

    return (
        <ClientInfos.Provider value={{ info, onPostInfoChanges, setInfo, setIsChanged, isChanged }}>
            {children}
        </ClientInfos.Provider>
    )
}

export default PostClientInfoContextProvider
