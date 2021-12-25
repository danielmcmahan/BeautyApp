import axios from "axios";

const BASE_URL = "/api/doctors";

export const doctors = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};
