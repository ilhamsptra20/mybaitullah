import { useState, useEffect } from 'react';
import fetchTabungan from '../../api/apiTabungan/apiTabungan.js';

const tabunganFetch = () => {
    const [tabungan, setTabungan] = useState([]);
    const [loadingTabungan, setLoadingTabungan] = useState(true);
    const [errorTabungan, setErrorTabungan] = useState(null);

    useEffect(() => {
        const loadTabunganData = async () => {
            try {
                const response = fetchTabungan;
                setTabungan(response);
            } catch (err) {
                setErrorTabungan(err.message);
            } finally {
                setLoadingTabungan(false);
            }
        };
        loadTabunganData();
    }, []);

    return { tabungan, loadingTabungan, errorTabungan };
};

export default tabunganFetch;