import React, { createContext, useEffect, useState } from 'react';

// service : get all clients
import * as clientService from '../Services/Api/client.api';

export const ClientContext = createContext();

const ClientContextProvider = ({ children }) => {
    const [allClient, setAllClient] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addQueryForSearch, setAddQueryForSearch] = useState("");
    const [doctorIdForSearch, setDoctorIdForSearch] = useState(0);
    const [tablePageNumber, setTablePageNumber] = useState(0);

    const _getClients = async (next = -1) => {
        const targetPage = next === -1 ? tablePageNumber : next;

        const conditionNextPage = next > -1 && next > tablePageNumber;
        const conditionSearch = next === 0 && next <= tablePageNumber;

        if (conditionNextPage || conditionSearch) {
            setTablePageNumber(next);
            const res = await clientService.GetAll(targetPage, addQueryForSearch, doctorIdForSearch);

            conditionNextPage && setAllClient(prev => [...prev, ...res]);
            conditionSearch && setAllClient(res);
        }


        setLoading(false);
    };

    useEffect(() => {
        _getClients(0);
    }, []);

    return (
        <ClientContext.Provider value={{ allClient, loading, _getClients, setAllClient, addQueryForSearch, setAddQueryForSearch, setTablePageNumber, tablePageNumber, doctorIdForSearch, setDoctorIdForSearch }}>
            {children}
        </ClientContext.Provider>
    )
}

export default ClientContextProvider;
