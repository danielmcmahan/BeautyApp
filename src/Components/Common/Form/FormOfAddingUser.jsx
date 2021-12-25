import React, { useContext, useState } from 'react';

import Input from '../FormField/Input';

import * as userApi from "../../../Services/Api/user.api";
import { UserContext } from '../../../Context/UserContextProvider';

const FormOfAddingUser = ({ modalVisibility, modalBtnText }) => {
    // const resetFormValues = (model, state) => {
    //     state(Object.assign(...Object.keys(model).map((k) => ({ [k]: "" }))));
    // }

    const onSubmit = (e) => e.preventDefault();

    const [userInfo, setUserInfo] = useState({
        name: "",
        userName: "",
        password: "",
        passwordConfirm: ""
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
        const emptyInputs = invalidInputs(model);

        if (emptyInputs.length) {
            setError((prev) => {
                emptyInputs.forEach(key => {
                    prev[key] = true;
                });

                return { ...prev };
            });
        } else {
            debugger
            const response = await userApi.Save(model);

            if (model.id === 0)
                setAllUser((currentArray) => [response, ...currentArray]);

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
                    <Input
                        inputType="text"
                        labelFor="userName"
                        labelText="نام کاربری :"
                        inputId="userName"
                        placeholder="نام کاربری"
                        field="userName"
                        maxLength={256}
                        inputValue={userInfo.userName}
                        changeEvent={(e) => onUserInputChange(e, error)}
                        handleClasses={error.userName ? 'border-danger' : ''}
                    />
                </div>
                <div className="col-12">
                    <Input
                        inputType="password"
                        labelFor="password"
                        labelText="رمز عبور :"
                        inputId="password"
                        placeholder="نمونه رمز عبور مورد تایید: 654321!a"
                        field="password"
                        maxLength={8}
                        inputValue={userInfo.password}
                        changeEvent={(e) => onUserInputChange(e, error)}
                        handleClasses={error.password ? 'border-danger' : ''}
                    />
                </div>
                <div className="col-12">
                    <Input
                        inputType="password"
                        labelFor="passwordConfirm"
                        labelText="تکرار رمز عبور :"
                        inputId="passwordConfirm"
                        placeholder="تکرار رمز عبور"
                        field="passwordConfirm"
                        maxLength={8}
                        inputValue={userInfo.passwordConfirm}
                        changeEvent={(e) => onUserInputChange(e, error)}
                        handleClasses={error.passwordConfirm ? 'border-danger' : ''}
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

export default FormOfAddingUser;
