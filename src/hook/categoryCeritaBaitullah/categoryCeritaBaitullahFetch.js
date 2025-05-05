import { useState, useEffect } from 'react';
import fetchCategoryCeritaBaitullah from '../../api/apiCategoryCeritaBaitullah/apiCategoryCeritaBaitullah.js';

const categoryCeritaBaitullahFetch = () => {
    const [categoryCeritaBaitullah, setCategoryCeritaBaitullah] = useState([]);
    const [loadingCategoryCeritaBaitullah, setLoadingCategoryCeritaBaitullah] = useState(true);
    const [errorCategoryCeritaBaitullah, setErrorCategoryCeritaBaitullah] = useState(null);

    useEffect(() => {
        const loadCategoryCeritaBaitullahData = async () => {
            try {
                const response = fetchCategoryCeritaBaitullah;
                setCategoryCeritaBaitullah(response);
            } catch (err) {
                setErrorCategoryCeritaBaitullah(err.message);
            } finally {
                setLoadingCategoryCeritaBaitullah(false);
            }
        };
        loadCategoryCeritaBaitullahData();
    }, []);

    return { categoryCeritaBaitullah, loadingCategoryCeritaBaitullah, errorCategoryCeritaBaitullah };
};

export default categoryCeritaBaitullahFetch;