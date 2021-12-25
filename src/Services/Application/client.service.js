import { useContext, useState } from "react";
import { ClientContext } from "../../Context/ClientContextProvider";
import { ModalContext } from "../../Context/ModalContextProvider";
import { ClientInfos } from "../../Context/PostClientInfoContextProvider";
import * as ClientApi from "../Api/client.api";

export const ClientFormHandler = () => {
  const { closeModal } = useContext(ModalContext);
  const { info, setInfo, onPostInfoChanges, isChanged, setIsChanged } =
    useContext(ClientInfos);
  const { setAllClient } = useContext(ClientContext);
  const [error, setError] = useState({});

  const inputException = ["historyOfSurgery", "historyOfDrugUse", "id"];

  const invalidInputs = (data) => {
    return Object.keys(data)
      .filter((key) => !inputException.some((ex) => ex === key))
      .filter((key) => data[key] === "");
  };

  const onSubmit = (event) => event.preventDefault();

  const onSubmitHandler = async (model) => {
    const emptyInputs = invalidInputs(model);

    if (emptyInputs.length) {
      setError((prev) => {
        emptyInputs.forEach((key) => {
          prev[key] = true;
        });

        return { ...prev };
      });
    } else {
      const response = await ClientApi.Save(model);

      if (model.id === 0) {
        setAllClient((currentArray) => [response, ...currentArray]);
      } else {
        setAllClient((currentArray) => {
          const index = currentArray.findIndex((c) => c.id === model.id);
          const newArray = [...currentArray];
          newArray[index] = response;
          setIsChanged(true);
          return newArray;
        });
      }

      setError({});
    }
  };

  return {
    info,
    onPostInfoChanges,
    error,
    setInfo,
    isChanged,
    closeModal,
    onSubmit,
    onSubmitHandler,
  };
};
