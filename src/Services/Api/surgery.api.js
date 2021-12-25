import axios from "axios";

const BASE_URL = "/api/surgeries";

export const Get = async (clientId) => {
  const response = await axios.get(`${BASE_URL}/${clientId}`);
  return response.data;
};

export const Save = async (model) => {
  if (!model.id) {
    model.id = 0;
    return (await axios.post(`${BASE_URL}`, model)).data;
  } else return (await axios.put(`${BASE_URL}`, model)).data;
};

// export const SetPhotoTaken = async (id) => {
//   const response = await axios.post(`${BASE_URL}/set-photo-taken/${id}`);
//   return response.data;
// };

export const Delete = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
