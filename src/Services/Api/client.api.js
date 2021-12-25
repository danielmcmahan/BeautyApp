import axios from "axios";

const BASE_URL = "/api/clients";

export const GetAll = async (pageNumber = 0, query = "", doctorId = 0) => {
  let url = `${BASE_URL}`;

  const queryString = [];
  if (pageNumber > 0) queryString.push(`page=${pageNumber}`);
  if (query && query !== "") queryString.push(`query=${query}`);
  if (doctorId > 0) queryString.push(`doctorId=${doctorId}`);

  if (queryString.length > 0)
    url += "?" + queryString.reduce((a, b) => `${a}&${b}`);

  const response = await axios.get(url);
  return response.data;
};

export const GetSingle = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const GetByDoctorId = async (id, page = 0, query = "") => {
  let url =
    page === 0 && query === ""
      ? `${BASE_URL}/by-doctor/${id}`
      : `${BASE_URL}/by-doctor/${id}?`;

  if (page > 0) url += `page=${page}`;
  if (query && query !== "") url += `query=${query}`;

  const response = await axios.get(url);
  return response.data;
};

export const Save = async (model) => {
  if (!model.id) {
    model.id = 0;
    return (await axios.post(`${BASE_URL}`, model)).data;
  } else return (await axios.put(`${BASE_URL}`, model)).data;
};

// export const SetNextVisit = async (model) => {
//   const response = await axios.post(`${BASE_URL}/set-next-visit`);
//   return response.data;
// };

// export const SetIsVisited = async (model) => {
//   const response = await axios.post(`${BASE_URL}/set-is-visited`, model);
//   return response.data;
// };

export const Delete = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
