import axios from "axios";

const BASE_URL = "/api/users";

export const authentication = async (loginInfo) => {
  delete axios.defaults.headers.common["Authorization"];

  const response = await axios.post(`${BASE_URL}/authenticate`, loginInfo);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.token}`;

  localStorage.setItem("token", response.data.token);

  return response.data;
};

// get all users
export const GetAll = async () => (await axios.get(BASE_URL)).data;

// get single user
export const GetSingle = async (userId) =>
  (await axios.get(`${BASE_URL}/${userId}`)).data;

// post new user infos
export const Save = async (model) => {
  if (!model.id) {
    model.id = 0;
    return (await axios.post(`${BASE_URL}`, model)).data;
  } else return (await axios.put(`${BASE_URL}`, model)).data;
};

// change user password
export const ChangePassword = async (model) =>
  (await axios.post(`${BASE_URL}/change-password`, model)).data;
