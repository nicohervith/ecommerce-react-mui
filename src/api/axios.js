import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const instance = axios.create({
  baseURL: `${apiUrl}`,
  withCredentials: true,
});

export default instance;
