import React from 'react';

// components
import CancelBtn from '../../../Components/Common/CancelBtn/CancelBtn';
import EditBtn from '../../../Components/Common/EditBtn/EditBtn';
import Input from '../../../Components/Common/FormField/Input';
import SelectDoctor from '../../../Components/Common/FormField/SelectDoctor';
import SaveModifiedInfosBtn from '../../../Components/Common/SaveModifiedInfosBtn/SaveModifiedInfosBtn';

// HOC
import Fieldset from "../../../HOC/Fieldset";
import RowCommonForm from "../../../HOC/RowCommonForm";

// Service
import ClientModification from '../../../Services/Application/client-modification.service';

// datepicker

const ClientPersonalInfo = () => {
    const { onSubmit,
        isReadOnly,
        info,
        onPostInfoChanges,
        error,
        isDisabled,
        isChanged,
        canEdit,
        onEdit,
        onCancel,
        onSubmitHandler } = ClientModification()

    return (
        <form onSubmit={onSubmit}>
            <Fieldset title="مشخصات فردی">
                <RowCommonForm>
                    <div className="col-12 col-md-6 col-lg-4">
                        <Input
                            inputType="text"
                            labelFor="name"
                            labelText="نام :"
                            inputId="name"
                            placeholder="فاطمه میرزایی"
                            field="name"
                            maxLength={256}
                            readonly={isReadOnly}
                            inputValue={info.name}
                            changeEvent={(event) => onPostInfoChanges(event, error)}
                            handleClasses={error.name ? 'border-danger' : ''}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <Input
                            inputType="text"
                            labelFor="nationalCode"
                            labelText="کدملی :"
                            inputId="nationalCode"
                            placeholder="0022785752"
                            field="nationalCode"
                            direction="ltr"
                            maxLength={10}
                            readonly={isReadOnly}
                            inputValue={info.nationalCode}
                            changeEvent={(event) => onPostInfoChanges(event, error)}
                            handleClasses={error.nationalCode ? 'border-danger' : ''}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <SelectDoctor
                            labelFor="doctor"
                            labelText="نام پزشک :"
                            selectId="doctor"
                            field="doctorId"
                            disabled={isDisabled}
                            doctorId={info.doctorId}
                            changeEvent={(event) => onPostInfoChanges(event, error)}
                            handleClasses={error.doctorId ? 'border-danger' : ''}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="row">
                            <div className="col-8">
                                <Input
                                    inputType="text"
                                    labelFor="phone"
                                    labelText="شماره تماس :"
                                    inputId="phone"
                                    placeholder="09915060644"
                                    direction="ltr"
                                    field="phone"
                                    maxLength={11}
                                    readonly={isReadOnly}
                                    inputValue={info.phone}
                                    changeEvent={(event) => onPostInfoChanges(event, error)}
                                    handleClasses={error.phone ? 'border-danger' : ''}
                                />
                            </div>
                            <div className="col-4 pe-md-0">
                                <Input
                                    inputType="text"
                                    labelFor="age"
                                    labelText="سن :"
                                    inputId="age"
                                    placeholder="22"
                                    direction="ltr"
                                    field="age"
                                    readonly={isReadOnly}
                                    inputValue={info.age}
                                    changeEvent={(event) => onPostInfoChanges(event, error)}
                                    handleClasses={error.age ? 'border-danger' : ''}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <Input
                            inputType="text"
                            labelFor="historyOfSurgery"
                            labelText="سابقه جراحی :"
                            inputId="historyOfSurgery"
                            placeholder="جراحی پلاستیک"
                            field="historyOfSurgery"
                            maxLength={500}
                            readonly={isReadOnly}
                            inputValue={info.historyOfSurgery}
                            changeEvent={onPostInfoChanges}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <Input
                            inputType="text"
                            labelFor="historyOfDrugUse"
                            labelText="سابقه مصرف دارو :"
                            inputId="historyOfDrugUse"
                            placeholder="نفازولین"
                            field="historyOfDrugUse"
                            maxLength={500}
                            readonly={isReadOnly}
                            inputValue={info.historyOfDrugUse}
                            changeEvent={onPostInfoChanges}
                        />
                    </div>
                    <div className="col-12 text-end d-flex">
                        <EditBtn handleClass={canEdit ? "d-none" : "d-inline-block"} margin="ms-3" onedit={onEdit} />
                        <div className={canEdit ? "d-block" : "d-none"}>
                            <SaveModifiedInfosBtn updateCientInfo={() => isChanged && onSubmitHandler(info)} margin="ms-3" />
                            <CancelBtn oncancel={onCancel} />
                        </div>
                    </div>
                </RowCommonForm>
            </Fieldset>
        </form>
    )
}

export default ClientPersonalInfo;
