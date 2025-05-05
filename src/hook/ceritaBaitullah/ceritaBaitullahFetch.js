import { useState, useEffect } from 'react';
import fetchCeritaBaitullah from '../../api/apiCeritaBaitullah/apiCeritaBaitullah.js';

const ceritaBaitullahFetch = () => {
    const [ceritaBaitullah, setCeritaBaitullah] = useState([]);
    const [loadingCeritaBaitullah, setLoadingCeritaBaitullah] = useState(true);
    const [errorCeritaBaitullah, setErrorCeritaBaitullah] = useState(null);

    useEffect(() => {
        const loadCeritaBaitullahData = async () => {
            try {
                const response = fetchCeritaBaitullah;
                setCeritaBaitullah(response);
            } catch (err) {
                setErrorCeritaBaitullah(err.message);
            } finally {
                setLoadingCeritaBaitullah(false);
            }
        };
        loadCeritaBaitullahData();
    }, []);

    return { ceritaBaitullah, loadingCeritaBaitullah, errorCeritaBaitullah };
};

export default ceritaBaitullahFetch;