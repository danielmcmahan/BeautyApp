import React from 'react';

const LoginInput = (props) => {
    const {
        type,
        placeholder,
        name,
        ico,
        marginBottom,
        handleChanges,
        inputValue,
    } = props;

    return (
        <div className={`form-group ${marginBottom}`}>
            <div className="position-relative">
                <input
                    className={`form-control`}
                    type={type}
                    onChange={handleChanges}
                    value={inputValue}
                    placeholder={placeholder}
                    name={name}
                />
                <span className={`fa fa-${ico}`}></span>
            </div>
        </div>
    )
}

export default LoginInput;
