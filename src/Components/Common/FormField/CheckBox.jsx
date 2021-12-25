import React from 'react'

const CheckBox = (props) => {
    const {
        CBid,
        CBlabel,
        CBlabelFor,
        CBvalue,
        CBdisabled,
        field,
        changeEvent
    } = props;

    return (
        <div className="form-check">
            <input
                type="checkbox"
                className="form-check-input"
                value={CBvalue}
                checked={CBvalue}
                id={CBid}
                name={field}
                disabled={CBdisabled}
                onChange={changeEvent}
            />
            <label className="form-check-label" htmlFor={CBlabelFor}>
                {CBlabel}
            </label>
        </div>
    )
}

export default CheckBox
