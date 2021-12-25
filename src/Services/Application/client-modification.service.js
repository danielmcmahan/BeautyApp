import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetSingle } from "../Api/client.api";
import { ClientFormHandler } from "./client.service";

const ClientModification = () => {
  const { id } = useParams();

  const {
    info,
    setInfo,
    onPostInfoChanges,
    error,
    isChanged,
    onSubmit,
    onSubmitHandler,
  } = ClientFormHandler();

  const [canEdit, setCanEdit] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const onEdit = () => {
    setCanEdit(true);
    setIsReadOnly(false);
    setIsDisabled(false);
  };

  const onCancel = () => {
    setCanEdit(false);
    setIsReadOnly(true);
    setIsDisabled(true);
  };

  useEffect(() => {
    const GetClient = async () => setInfo(await GetSingle(`${id}`));
    GetClient();
  }, [setInfo, id]);

  return {
    id,
    info,
    setInfo,
    onPostInfoChanges,
    error,
    isChanged,
    canEdit,
    isReadOnly,
    isDisabled,
    setIsReadOnly,
    setIsDisabled,
    setCanEdit,
    onSubmit,
    onSubmitHandler,
    onEdit,
    onCancel,
  };
};

export default ClientModification;
