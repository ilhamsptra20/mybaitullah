import { useState } from 'react';
import { loginApi } from '../api/loginApi';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);

        const result = await loginApi(credentials);

        if (!result.success) {
            setError(result.error);
        }

        setLoading(false);
        return result;
    };

    return { login, loading, error };
};

export default useLogin;