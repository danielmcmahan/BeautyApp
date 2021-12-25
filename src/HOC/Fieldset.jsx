import React from 'react';

const Fieldset = ({ title, children }) => {
    return (
        <fieldset className="mb-5">
            <legend className="mb-5">
                <h4 className="mb-0">{title}</h4>
            </legend>

            {children}
        </fieldset>
    )
}

export default Fieldset;
