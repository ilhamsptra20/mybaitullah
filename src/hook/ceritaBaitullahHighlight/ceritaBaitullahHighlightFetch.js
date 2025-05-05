import { useState, useEffect } from 'react';
import fetchCeritaBaitullahHighlight from '../../api/apiCeritaBaitullahHighlight/apiCeritaBaitullahHighlight.js';

const ceritaBaitullahHighlightFetch = () => {
    const [ceritaBaitullahHighlight, setCeritaBaitullahHighlight] = useState([]);
    const [loadingCeritaBaitullahHighlight, setLoadingCeritaBaitullahHighlight] = useState(true);
    const [errorCeritaBaitullahHighlight, setErrorCeritaBaitullahHighlight] = useState(null);

    useEffect(() => {
        const loadCeritaBaitullahHighlightData = async () => {
            try {
                const response = fetchCeritaBaitullahHighlight;
                setCeritaBaitullahHighlight(response);
            } catch (err) {
                setErrorCeritaBaitullahHighlight(err.message);
            } finally {
                setLoadingCeritaBaitullahHighlight(false);
            }
        };
        loadCeritaBaitullahHighlightData();
    }, []);

    return { ceritaBaitullahHighlight, loadingCeritaBaitullahHighlight, errorCeritaBaitullahHighlight };
};

export default ceritaBaitullahHighlightFetch;