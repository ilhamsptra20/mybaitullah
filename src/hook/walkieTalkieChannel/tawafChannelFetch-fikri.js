import { useState, useEffect } from 'react';
import fetchTawafChannel from '../../api/apiTawafChannel/apiTawafChannel.js';

const tawafChannelFetch = () => {
    const [tawafChannel, setTawafChannel] = useState([]);
    const [loadingTawafChannel, setLoadingTawafChannel] = useState(true);
    const [errorTawafChannel, setErrorTawafChannel] = useState(null);

    useEffect(() => {
        const loadTawafChannelData = async () => {
            try {
                const response = fetchTawafChannel;
                setTawafChannel(response);
            } catch (err) {
                setErrorTawafChannel(err.message);
            } finally {
                setLoadingTawafChannel(false);
            }
        };
        loadTawafChannelData();
    }, []);

    return { tawafChannel, loadingTawafChannel, errorTawafChannel };
};

export default tawafChannelFetch;