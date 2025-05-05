import { useState, useEffect } from 'react';
import fetchStepTabungan from '../../api/apiStepTabungan/apiStepTabungan.js';

const stepTabunganFetch = () => {
    const [stepTabungan, setStepTabungan] = useState([]);
    const [loadingStepTabungan, setLoadingStepTabungan] = useState(true);
    const [errorStepTabungan, setErrorStepTabungan] = useState(null);

    useEffect(() => {
        const loadStepTabunganData = async () => {
            try {
                const response = fetchStepTabungan;
                setStepTabungan(response);
            } catch (err) {
                setErrorStepTabungan(err.message);
            } finally {
                setLoadingStepTabungan(false);
            }
        };
        loadStepTabunganData();
    }, []);

    return { stepTabungan, loadingStepTabungan, errorStepTabungan };
};

export default stepTabunganFetch;