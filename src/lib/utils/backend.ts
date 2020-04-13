import axios from "axios";
const config = {
  baseURL: process.env.REACT_APP_BACKEND_URL,
  params: {
    currency: "USD",
  },
};
const backend = axios.create(config);
export default backend;
