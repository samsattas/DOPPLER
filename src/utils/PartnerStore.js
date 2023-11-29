import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1/partners";

export const getAllPartners = async () => {
  const response = await axios.get(baseUrl);
  const data = await response.data;
  return data;
};

export const postPartner = async (payload) => {
  const response = await axios.post(baseUrl, payload);
  const data = await response.data;
  return data;
};

export const deletePartner = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  const data = await response.data;
  return data;
};
