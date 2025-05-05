import { useState, useEffect } from 'react';
import fetchCeritaBaitullahTerbaru from '../../api/apiCeritaBaitullahTerbaru/apiCeritaBaitullahTerbaru.js'

const ceritaBaitullahTerbaruFetch = () => {
    const [ceritaBaitullahTerbaru, setceritaBaitullahTerbaru] = useState([]);
    const [loadingceritaBaitullahTerbaru, setLoadingceritaBaitullahTerbaru] = useState(true);
    const [errorceritaBaitullahTerbaru, setErrorceritaBaitullahTerbaru] = useState(null);

    useEffect(() => {
        const loadceritaBaitullahTerbaruData = async () => {
            try {
                const response = fetchCeritaBaitullahTerbaru;
                setceritaBaitullahTerbaru(response);
            } catch (err) {
                setErrorceritaBaitullahTerbaru(err.message);
            } finally {
                setLoadingceritaBaitullahTerbaru(false);
            }
        };
        loadceritaBaitullahTerbaruData();
    }, []);

    return { ceritaBaitullahTerbaru, loadingceritaBaitullahTerbaru, errorceritaBaitullahTerbaru };
};

export default ceritaBaitullahTerbaruFetch;