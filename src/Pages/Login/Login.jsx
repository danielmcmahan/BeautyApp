import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import authLogin from './auth-login';
import ReactLoading from 'react-loading';
import * as userService from '../../Services/Api/user.api';


const Login = () => {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState({});
    const [showError, setShowError] = useState({});
    const [loading, setLoading] = useState(false);

    const changeHandler = (event) => {
        setInputValue({
            ...inputValue,
            [event.target.name]: event.target.value
        });
    }


    const objHasValue = (obj) => {
        return Object.values(obj).every(item => item === "");
    }


    const submitHandler = async (event) => {
        event.preventDefault();

        if (objHasValue(inputValue)) {
            setShowError({
                ...showError,
                showUsernameError: true,
                showPasswordError: true
            });
        } else {

            setLoading(true);
            const response = await userService.authentication(inputValue);
            response.profile === "1" ? navigate("/admin") : navigate("/clients");
        }
    }


    useEffect(() => {
        setError(authLogin(inputValue));
        objHasValue(inputValue);
    }, [inputValue]);


    return (
        <div className="container h-100 d-flex align-items-center justify-content-center my-auto">
            <div className="row justify-content-center w-100 my-5">
                <div className="col-12 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
                    <form onSubmit={submitHandler} className="w-100" action="">
                        <div className="card-form">
                            <div className="prof">
                                <i className="bi bi-person-circle"></i>
                            </div>
                            <h4 className="mb-5 mt-4">ورود به پنل کاربری</h4>
                            <div className="form-group">
                                <div className="position-relative">
                                    <input
                                        className="form-control"
                                        type="text"
                                        onChange={changeHandler}
                                        value={inputValue.username}
                                        placeholder="نام کاربری"
                                        name="username"
                                        autoComplete="off"
                                    />
                                    <span className="bi bi-person-circle"></span>
                                </div>
                                <div className="text-danger me-3 mt-1">
                                    <small>
                                        {showError.showUsernameError && error.username}
                                    </small>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="position-relative">
                                    <input
                                        className="form-control"
                                        type="password"
                                        onChange={changeHandler}
                                        value={inputValue.password}
                                        placeholder="رمز عبور"
                                        name="password"
                                    />
                                    <span className="bi bi-lock-fill"></span>
                                </div>
                                <div className="text-danger me-3 mt-1">
                                    <small>
                                        {showError.showUsernameError && error.password}
                                    </small>
                                </div>
                            </div>
                            <button className="btn">
                                {loading ? <ReactLoading type="bubbles" color="#fff" height={70} width={75} /> : "ورود به داشبورد"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Login
