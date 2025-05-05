import { useState, useEffect } from 'react';
import { getItem, removeItem } from '../utils/localStorage';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAuthData = async () => {
            const storedToken = await getItem('token');
            const storedUser = await getItem('user');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(storedUser);
            }

            setLoading(false);
        };

        loadAuthData();
    }, []);

    const logout = async () => {
        await removeItem('token');
        await removeItem('user');
        setUser(null);
        setToken(null);
    };

    return { user, token, loading, logout };
};

export default useAuth;