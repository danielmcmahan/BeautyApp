import React, { useEffect, useState } from "react";
import CancelBtn from "../../../Components/Common/CancelBtn/CancelBtn";
import EditBtn from "../../../Components/Common/EditBtn/EditBtn";

// components
import CheckBox from "../../../Components/Common/FormField/CheckBox";
import Input from "../../../Components/Common/FormField/Input";
import SaveModifiedInfosBtn from "../../../Components/Common/SaveModifiedInfosBtn/SaveModifiedInfosBtn";

// HOC
import Fieldset from "../../../HOC/Fieldset";
import RowCommonForm from "../../../HOC/RowCommonForm";

// Service
import ClientModification from "../../../Services/Application/client-modification.service";
import * as surgeryApi from "../../../Services/Api/surgery.api";

// jalali
import * as moment from "jalali-moment";


const ClientSurgeryStatus = () => {
    const {
        id,
        isDisabled,
        isReadOnly,
        canEdit,
        setIsReadOnly,
        setIsDisabled,
        setCanEdit,
        onSubmit,
        onEdit,
        onCancel,
    } = ClientModification();

    const [surgery, setSurgery] = useState([]);
    // const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        (async function () {
            const response = await surgeryApi.Get(id);
            setSurgery(response.length && response[0]);
        })();
    }, [id]);

    const onChangeSurgeryInfo = (event) => {
        setSurgery({
            ...surgery,
            clientId: Number(id),
            [event.target.name]: event.target.value
        });
        // setIsChanged(true);
    }

    const [time, setTime] = useState({ clock: "" });
    const [date, setDate] = useState({ date: "" });
    const [dateTime, setDateTime] = useState(new Date());
    const SHAMSI_REGEX = /^1[34][0-9][0-9]\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|([1-2][0-9])|(0[1-9]))))$/gi;
    const TIME_REGEX = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;


    useEffect(() => {
        if (typeof surgery.dueDate == "string" && surgery.dueDate !== "0001-01-01T00:00:00") {
            surgery.dueDate = surgery.dueDate && !surgery.dueDate.endsWith('Z') ? surgery.dueDate + 'Z' : surgery.dueDate;
            let currDueDate = surgery.dueDate ? new Date(surgery.dueDate) : new Date();
            let currentTime = currDueDate.toTimeString().split(" ")[0].split(":").filter((x, i) => i < 2).reduce((a, b) => `${a}:${b}`);
            let jalaliCurrentDate = moment(currDueDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');

            if (surgery.dueDate) {
                setDateTime(currDueDate);
                setDate({ date: jalaliCurrentDate });
                setTime({ clock: currentTime });
            }
        }
    }, [surgery.dueDate]);

    const onTimeInput = (event) => {
        setTime({
            clock: event.target.value
        });
        if (TIME_REGEX.test(event.target.value)) {
            const splitedTime = event.target.value.split(":");
            const clone = new Date(dateTime.toString());
            clone.setHours(splitedTime[0], splitedTime[1]);
            setDateTime(clone);
            setSurgery(prev => ({ ...prev, dueDate: clone }));
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
            setDateTime(clone);
            setSurgery(prev => ({ ...prev, dueDate: dateTime }));
        }
    }

    const onChangeSurgeryCheckBox = (event) => {
        setSurgery({
            ...surgery,
            isPhotoTaken: event.target.checked
        });
    }

    const onPostSurgeryInfo = async (model) => {
        debugger
        await surgeryApi.Save(model);
        setCanEdit(false);
        setIsReadOnly(true);
        setIsDisabled(true);
    }


    return (
        <form onSubmit={onSubmit}>
            <Fieldset title="وضعیت عمل">
                <RowCommonForm>
                    <div className="col-12 col-md-6 col-lg-4">
                        <Input
                            inputType="text"
                            labelFor="surgeryDate"
                            labelText="تاریخ عمل :"
                            inputId="surgeryDate"
                            placeholder="1400/02/03"
                            field="surgeryDate"
                            maxLength={10}
                            readonly={isReadOnly}
                            inputValue={date.date || ""}
                            changeEvent={onDateInput}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <Input
                            inputType="text"
                            labelFor="surgeryTime"
                            labelText="ساعت عمل :"
                            inputId="surgeryTime"
                            placeholder="16:30"
                            field="surgeryTime"
                            maxLength={5}
                            readonly={isReadOnly}
                            inputValue={time.clock || ""}
                            changeEvent={onTimeInput}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <CheckBox
                            CBid="isPhotoTaken"
                            CBlabelFor="isPhotoTaken"
                            CBlabel="عکس برداری انجام شده است"
                            CBdisabled={isDisabled}
                            CBvalue={surgery.isPhotoTaken || false}
                            field="isPhotoTaken"
                            changeEvent={onChangeSurgeryCheckBox}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <Input
                            inputType="text"
                            labelFor="prepayment"
                            labelText="بیعانه (تومان) :"
                            inputId="prepayment"
                            placeholder="25000"
                            field="prepayment"
                            maxLength={500}
                            readonly={isReadOnly}
                            inputValue={surgery.prepayment || ""}
                            changeEvent={onChangeSurgeryInfo}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4">
                        <Input
                            inputType="text"
                            labelFor="cost"
                            labelText="هزینه کل (تومان) :"
                            inputId="cost"
                            placeholder="305000"
                            field="cost"
                            maxLength={500}
                            readonly={isReadOnly}
                            inputValue={surgery.cost || ""}
                            changeEvent={onChangeSurgeryInfo}
                        />
                    </div>
                    <div className="col-12 text-end d-flex">
                        <EditBtn
                            handleClass={canEdit ? "d-none" : "d-inline-block"}
                            margin="ms-3"
                            onedit={onEdit}
                        />
                        <div className={canEdit ? "d-block" : "d-none"}>
                            <SaveModifiedInfosBtn
                                updateCientInfo={() => onPostSurgeryInfo(surgery)}
                                margin="ms-3"
                            />
                            <CancelBtn oncancel={onCancel} />
                        </div>
                    </div>
                </RowCommonForm>
            </Fieldset>
        </form>
    );
};

export default ClientSurgeryStatus;
