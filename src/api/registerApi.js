import Axios from '../utils/axios';
import { setItem } from '../utils/localStorage';

export const registerApi = async (data) => {
    try {
        const response = await Axios.post('/register', data);

        const { user } = response.data;

        return { success: true, user };
    } catch (err) {
        console.log('Register error:', err);

        return {
            success: false,
            error: err.response?.data?.errors || err.response?.data?.message || 'Register failed',
        };
    }
};