import axios from 'axios';
import { API_BAITULLAH_URL } from '../config';

const Axios = axios.create({
    baseURL: API_BAITULLAH_URL, // Ganti dengan URL API kamu
    headers: {
        'Content-Type': 'application/json',
    },
});

export default Axios;