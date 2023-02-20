import  axios from 'axios';
import { API_URL } from "../Config";

const instance = axios.create({
  timeout: 9000,
  baseURL: API_URL,
})

export default instance
