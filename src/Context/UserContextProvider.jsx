import React, { createContext, useEffect, useState } from 'react';
import * as userService from '../Services/Api/user.api';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [allUser, setAllUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addQueryForUserSearch, setAddQueryForUserSearch] = useState("");
    const [tablePageNumber, setTablePageNumber] = useState(0);

    const _getUsers = async (next = -1) => {
        const targetPage = next === -1 ? tablePageNumber : next;

        const conditionNextPage = next > -1 && next > tablePageNumber;
        const conditionSearch = next === 0 && next <= tablePageNumber;

        if (conditionNextPage || conditionSearch) {
            setTablePageNumber(next);
            const res = await userService.GetAll(targetPage, addQueryForUserSearch);

            conditionNextPage && setAllUser(prev => [...prev, ...res]);
            conditionSearch && setAllUser(res);
        }


        setLoading(false);
    };

    useEffect(() => {
        _getUsers(0);
        setLoading(false);
    }, []);

    return (
        <UserContext.Provider value={{ allUser, loading, setAllUser, _getUsers, addQueryForUserSearch, setAddQueryForUserSearch }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
