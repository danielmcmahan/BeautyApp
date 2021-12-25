import React, { Fragment, useEffect, useState } from 'react'
import { doctors } from '../../../Services/Api/doctors.api';

const SelectDoctor = (props) => {
    const { labelFor, labelText, selectId, field, changeEvent, doctorId, handleClasses, disabled, labelDisplay } = props;
    const [doctor, setDoctors] = useState([]);

    useEffect(() => {
        (async function () {
            setDoctors(await doctors());
        })()
    }, []);

    return (
        <Fragment>
            <label htmlFor={labelFor} className={`form-label ${labelDisplay}`}> {labelText} </label>
            <select
                className={`form-select ${handleClasses}`}
                id={selectId}
                name={field}
                value={doctorId}
                onChange={changeEvent}
                disabled={disabled}
            >
                <option value="default" defaultValue>انتخاب کنید</option>
                {
                    doctor && doctor.map(doc => (
                        <option value={doc.id} key={doc.id}>{doc.name}</option>
                    ))
                }
            </select>
        </Fragment>
    )
}

export default SelectDoctor
