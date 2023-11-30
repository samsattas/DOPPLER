import axios from "axios";

//In case of using another port, change the 8080 to the custom port.
const baseUrl = "http://localhost:8080/api/v1/partners";

/**
 * @description Gets all partners
 * @returns an array of partners in json format
 */
export const getAllPartners = async () => {
  const response = await axios.get(baseUrl);
  const data = await response.data;
  return data;
};

/**
 * @description Post a partner
 * @param {JSON} payload
 * @returns response data
 */
export const postPartner = async (payload) => {
  const response = await axios.post(baseUrl, payload);
  const data = await response.data;
  return data;
};

/**
 * @description Deletes a partner
 * @param {number} id
 * @returns response data
 */
export const deletePartner = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  const data = await response.data;
  return data;
};
