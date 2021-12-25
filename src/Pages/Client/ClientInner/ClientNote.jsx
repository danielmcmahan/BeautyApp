import React, { useEffect, useState } from "react";

// HOC
import Fieldset from "../../../HOC/Fieldset";
import RowCommonForm from "../../../HOC/RowCommonForm";

// Component
import Textarea from "../../../Components/Common/FormField/Textarea";

// Service
import ClientModification from "../../../Services/Application/client-modification.service";
import * as noteApi from "../../../Services/Api/notes.api";
import ClientDesc from "../../../Components/Common/ClientDesc/ClientDesc";

// jalali
import * as moment from "jalali-moment";

const ClientNote = () => {
    const { id, onSubmit } = ClientModification();
    const [notes, setNotes] = useState([]);
    const [textarea, setTextarea] = useState({
        text: ""
    });

    useEffect(() => {
        (async function () {
            const response = (await noteApi.Get(id))
                .map(item => {
                    item.jalali = moment(new Date(item.createdDate), 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD HH:mm');
                    return item;
                });
            console.log(response);
            setNotes(response);
        })();
    }, [id]);

    const onChangeTextarea = (event) => {
        setTextarea({
            ...textarea,
            clientId: Number(id),
            [event.target.name]: event.target.value
        })
    }

    const onPostNote = async (model) => {
        if (textarea.text !== "") {
            const response = await noteApi.Save(model);
            setTextarea({ text: "" });

            setNotes((currentNotes) => [response, ...currentNotes]);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <Fieldset title="توضیحات">
                <RowCommonForm>
                    <div className="col-12">
                        <Textarea field="text" change={onChangeTextarea} value={textarea.text} />
                    </div>
                    <div className="col-12 text-end d-flex">
                        <button
                            className="btn shadow-none action-toggler mb-5"
                            onClick={() => onPostNote(textarea)}
                        >
                            اضافه کردن توضیحات
                        </button>
                    </div>
                    <div className="col-12">
                        {
                            notes.length ?
                                notes.map(note => (
                                    <ClientDesc
                                        key={note.id}
                                        date={note.jalali}
                                        writer={note.writer}
                                        text={note.text}
                                    />
                                )) : null
                        }
                    </div>
                </RowCommonForm>
            </Fieldset>
        </form>
    );
};

export default ClientNote;
