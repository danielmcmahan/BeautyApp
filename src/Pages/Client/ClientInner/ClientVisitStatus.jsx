import React, { useEffect, useState } from 'react';
import CancelBtn from '../../../Components/Common/CancelBtn/CancelBtn';
import EditBtn from '../../../Components/Common/EditBtn/EditBtn';

// components
import CheckBox from '../../../Components/Common/FormField/CheckBox';
import SaveModifiedInfosBtn from '../../../Components/Common/SaveModifiedInfosBtn/SaveModifiedInfosBtn';
import Input from '../../../Components/Common/FormField/Input';

// HOC
import Fieldset from '../../../HOC/Fieldset';
import RowCommonForm from "../../../HOC/RowCommonForm";

// Service
import ClientModification from '../../../Services/Application/client-modification.service';

import * as moment from "jalali-moment";


const ClientVisitStatus = () => {
    const {
        isDisabled,
        canEdit,
        info,
        setInfo,
        isReadOnly,
        error,
        onSubmit,
        onEdit,
        onSubmitHandler,
        onCancel } = ClientModification();

    const [time, setTime] = useState({ clock: "" });
    const [date, setDate] = useState({ date: "" });
    const [dateTime, setDateTime] = useState(new Date());
    const SHAMSI_REGEX = /^1[34][0-9][0-9]\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|([1-2][0-9])|(0[1-9]))))$/gi;
    const TIME_REGEX = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;


    useEffect(() => {
        // debugger
        if (typeof info.nextVisit == "string" && info.nextVisit !== "0001-01-01T00:00:00") {
            info.nextVisit = info.nextVisit && !info.nextVisit.endsWith('Z') ? info.nextVisit + 'Z' : info.nextVisit;
            let currNextVisit = info.nextVisit ? new Date(info.nextVisit) : new Date();
            let currentTime = currNextVisit.toTimeString().split(" ")[0].split(":").filter((x, i) => i < 2).reduce((a, b) => `${a}:${b}`);
            let jalaliCurrentDate = moment(currNextVisit, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');

            if (info.nextVisit) {
                setDateTime(currNextVisit);
                setDate({ date: jalaliCurrentDate });
                setTime({ clock: currentTime });
            }
        }
    }, [info.nextVisit]);

    const onTimeInput = (event) => {
        setTime({
            clock: event.target.value
        });
        if (TIME_REGEX.test(event.target.value)) {
            // debugger
            const splitedTime = event.target.value.split(":");
            const clone = new Date(dateTime.toString());
            clone.setHours(splitedTime[0], splitedTime[1]);
            setDateTime(clone);
            setInfo(prev => ({ ...prev, nextVisit: clone }));
        }
    }

    const onDateInput = (event) => {
        setDate({
            date: event.target.value
        });

        if (SHAMSI_REGEX.test(event.target.value)) {
            const jalaliToGregorian = moment.from(event.target.value, "fa", "YYYY/MM/DD").locale("en")._d;
            const clone = new Date(dateTime.toString());
            clone.setFullYear(jalaliToGregorian.getFullYear(), jalaliToGregorian.getMonth(), jalaliToGregorian.getDate());
            // return clone;
            setDateTime(clone);
            setInfo(prev => ({ ...prev, nextVisit: clone }));
        }
    }

    const onCheckBoxHandler = async (event) => {
        setInfo(prevInfo => ({ ...prevInfo, isVisited: event.target.checked }));
    }

    return (
        <form onSubmit={onSubmit}>
            <Fieldset title="وضعیت ویزیت">
                <RowCommonForm>
                    <div className="col-12 col-md-6 col-lg-4">
                        <Input
                            inputType="text"
                            labelFor="nextVisit"
                            labelText="تاریخ ویزیت :"
                            inputId="nextVisit"
                            placeholder="1400/02/03"
                            field="nextVisit"
                            maxLength={10}
                            readonly={isReadOnly}
                            inputValue={date.date || ""}
                            changeEvent={onDateInput}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <Input
                            inputType="text"
                            labelFor="nextVisitTime"
                            labelText="ساعت ویزیت :"
                            inputId="nextVisitTime"
                            placeholder="16:30"
                            field="nextVisitTime"
                            maxLength={5}
                            readonly={isReadOnly}
                            inputValue={time.clock || ""}
                            changeEvent={onTimeInput}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <CheckBox
                            CBid="isVisited"
                            CBlabelFor="isVisited"
                            CBlabel="ویزیت انجام شده است"
                            CBdisabled={isDisabled}
                            CBvalue={info.isVisited || false}
                            field="isVisited"
                            changeEvent={onCheckBoxHandler}
                        />
                    </div>
                    <div className="col-12 text-end d-flex">
                        <EditBtn handleClass={canEdit ? "d-none" : "d-inline-block"} margin="ms-3" onedit={onEdit} />
                        <div className={canEdit ? "d-block" : "d-none"}>
                            <SaveModifiedInfosBtn updateCientInfo={() => onSubmitHandler(info)} margin="ms-3" />
                            <CancelBtn oncancel={onCancel} />
                        </div>
                    </div>
                </RowCommonForm>
            </Fieldset>
        </form>
    )
}

export default ClientVisitStatus;
