//import axios from 'axios';
import {endpoint} from './constants'

/*export const authAxios = axios.create({
  baseURL: endpoint,
  headers:{
    Authorization: `Token ${localStorage.getItem('token')}`
  }
});*/

export const authFetch =
fetch(endpoint, {
  Authorization: `Token ${localStorage.getItem('token')}`
});