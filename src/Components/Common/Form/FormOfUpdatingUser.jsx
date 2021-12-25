import React, { useContext, useEffect, useState } from 'react';

import Input from '../FormField/Input';

import * as userApi from "../../../Services/Api/user.api";
import { UserContext } from '../../../Context/UserContextProvider';

const FormOfUpdatingUser = ({ modalVisibility, modalBtnText, currentUserID }) => {
    const userId = currentUserID;

    const GetCurrentUser = async () => {
        if (userId !== null) {
            const res = await userApi.GetSingle(`${userId}`);
            setUserInfo(res);
        }
    }

    useEffect(() => {
        GetCurrentUser();
    }, [userId]);

    const onSubmit = (e) => e.preventDefault();

    const [userInfo, setUserInfo] = useState({
        name: "",
        username: ""
    });

    const [error, setError] = useState({});
    const { setAllUser } = useContext(UserContext);

    const onUserInputChange = (e, error) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
        error && delete error[e.target.name];
    }

    const invalidInputs = (input) => Object.keys(input).filter((key) => input[key] === "");

    const onPostUserInfo = async (model) => {
        debugger
        const emptyInputs = invalidInputs(model);

        if (emptyInputs.length) {
            setError((prev) => {
                emptyInputs.forEach(key => {
                    prev[key] = true;
                });

                return { ...prev };
            });
        } else {
            const response = await userApi.Save(model);

            if (model.id !== 0)
                setAllUser((currentArray) => {
                    const index = [...currentArray].findIndex((c) => c.id === model.id);
                    const newArray = [...currentArray];
                    newArray[index] = response;
                    return newArray;
                });

            setError({});
            modalVisibility();
        }
    }

    return (
        <>
            <form className="row gy-3" onSubmit={onSubmit}>
                <div className="col-12">
                    <Input
                        inputType="text"
                        labelFor="name"
                        labelText="نام منشی :"
                        inputId="name"
                        placeholder="فاطمه میرزایی"
                        field="name"
                        maxLength={256}
                        inputValue={userInfo.name}
                        changeEvent={(e) => onUserInputChange(e, error)}
                        handleClasses={error.name ? 'border-danger' : ''}
                    />
                </div>
                <div className="col-12">
                    <button
                        className="btn"
                        type="submit"
                        onClick={() => onPostUserInfo(userInfo)}
                    >
                        {modalBtnText}
                    </button>
                </div>
            </form>
        </>
    )
}

export default FormOfUpdatingUser;
