import React, { Fragment } from 'react';

const Input = (props) => {
    const { labelFor,
        labelText,
        inputType,
        inputId,
        placeholder,
        direction,
        field,
        maxLength,
        inputValue,
        changeEvent,
        handleClasses,
        inputref,
        readonly } = props;

    return (
        <Fragment>
            <label htmlFor={labelFor} className="form-label"> {labelText} </label>
            <input
                type={inputType}
                className={`form-control ${handleClasses}`}
                id={inputId}
                placeholder={placeholder}
                dir={direction}
                name={field}
                value={inputValue}
                onChange={changeEvent}
                maxLength={maxLength}
                readOnly={readonly}
                ref={inputref}
            />
        </Fragment>
    )
}
// inputValue === "" ? "form-control border-danger" : 
export default Input
