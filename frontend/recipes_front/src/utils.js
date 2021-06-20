//import axios from 'axios';
import {endpoint} from './constants'


export const authFetch =
fetch(endpoint, {
  Authorization: `Token ${localStorage.getItem('token')}`
});