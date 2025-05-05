import { useState } from 'react';
import { registerApi } from '../api/registerApi';

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const register = async (formData) => {
        setLoading(true);
        setErrors(null);

        const result = await registerApi(formData);

        if (!result.success) {
            setErrors(result.error);
        }

        setLoading(false);
        return result;
    };

    return { register, loading, errors };
};

export default useRegister;