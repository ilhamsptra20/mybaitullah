import Axios from '../utils/axios';
import { setItem } from '../utils/localStorage';

export const loginApi = async (credentials) => {
    try {
        const response = await Axios.post('/login', credentials);

        const { token, user } = response.data;

        await setItem('token', token);
        await setItem('user', user);

        return { success: true, user };
    } catch (err) {
        console.log('error', err);

        return { success: false, error: err.response?.data?.message || 'Login failed' };
    }
};