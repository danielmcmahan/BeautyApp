import React from 'react';
import { ClientFormHandler } from '../../../Services/Application/client.service';

import Input from '../FormField/Input';
import SelectDoctor from '../FormField/SelectDoctor';

const FormOfAddingClient = (props) => {
    const { info, setInfo, onPostInfoChanges, error, closeModal, onSubmit, onSubmitHandler } = ClientFormHandler();

    const resetFormValues = (model, state) => {
        state(Object.assign(...Object.keys(model).map((k) => ({ [k]: "" }))));
    }

    return (
        <>
            <form className="row gy-3" onSubmit={onSubmit}>
                <div className="col-12">
                    <Input
                        inputType="text"
                        labelFor="name"
                        labelText="نام :"
                        inputId="name"
                        placeholder="فاطمه میرزایی"
                        field="name"
                        maxLength={256}
                        inputValue={info.name}
                        changeEvent={(event) => onPostInfoChanges(event, error)}
                        handleClasses={error.name ? 'border-danger' : ''}
                    />
                </div>
                <div className="col-12">
                    <Input
                        inputType="text"
                        labelFor="nationalCode"
                        labelText="کدملی :"
                        inputId="nationalCode"
                        placeholder="0022785752"
                        field="nationalCode"
                        maxLength={10}
                        inputValue={info.nationalCode}
                        changeEvent={(event) => onPostInfoChanges(event, error)}
                        handleClasses={error.nationalCode ? 'border-danger' : ''}
                    />
                </div>
                <div className="col-12">
                    <SelectDoctor
                        labelFor="doctor"
                        labelText="نام پزشک :"
                        selectId="doctor"
                        field="doctorId"
                        doctorId={info.doctorId}
                        changeEvent={(event) => onPostInfoChanges(event, error)}
                        handleClasses={error.doctorId ? 'border-danger' : ''}
                    />
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 col-md-8">
                            <Input
                                inputType="text"
                                labelFor="phone"
                                labelText="شماره تماس :"
                                inputId="phone"
                                placeholder="09915060644"
                                direction="ltr"
                                field="phone"
                                maxLength={11}
                                inputValue={info.phone}
                                changeEvent={(event) => onPostInfoChanges(event, error)}
                                handleClasses={error.phone ? 'border-danger' : ''}
                            />
                        </div>
                        <div className="col-12 col-md-4 pe-md-0">
                            <Input
                                inputType="text"
                                labelFor="age"
                                labelText="سن :"
                                inputId="age"
                                placeholder="22"
                                direction="ltr"
                                field="age"
                                inputValue={info.age}
                                changeEvent={(event) => onPostInfoChanges(event, error)}
                                handleClasses={error.age ? 'border-danger' : ''}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <Input
                        inputType="text"
                        labelFor="historyOfSurgery"
                        labelText="سابقه جراحی :"
                        inputId="historyOfSurgery"
                        placeholder="جراحی پلاستیک"
                        field="historyOfSurgery"
                        maxLength={500}
                        inputValue={info.historyOfSurgery}
                        changeEvent={onPostInfoChanges}
                    />
                </div>
                <div className="col-12">
                    <Input
                        inputType="text"
                        labelFor="historyOfDrugUse"
                        labelText="سابقه مصرف دارو :"
                        inputId="historyOfDrugUse"
                        placeholder="نفازولین"
                        field="historyOfDrugUse"
                        maxLength={500}
                        inputValue={info.historyOfDrugUse}
                        changeEvent={onPostInfoChanges}
                    />
                </div>
                <div className="col-12">
                    <button
                        className="btn"
                        type="submit"
                        onClick={() => onSubmitHandler(info) && closeModal() && resetFormValues(info, setInfo)}
                    >
                        {props.modalBtnText}
                    </button>
                </div>
            </form>
        </>
    )
}

export default FormOfAddingClient;
