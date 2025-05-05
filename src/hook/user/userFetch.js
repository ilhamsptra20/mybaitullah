import { useState, useEffect } from 'react';
import { getItem } from '../../utils/localStorage';

const useUserFetch = () => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [errorUser, setErrorUser] = useState(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const response = await getItem('user');
                if (response) {
                    setUser(response);
                } else {
                    setErrorUser('User not found');
                }
            } catch (err) {
                setErrorUser(err.message);
            } finally {
                setLoadingUser(false);
            }
        };
        loadUserData();
    }, []);

    return { user, loadingUser, errorUser };
};

export default useUserFetch;