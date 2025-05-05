import { useState, useEffect, useCallback } from 'react';
import { tawafChannelFetchApi } from '../../api/tawafChannelApi.js';

const tawafChannelFetch = () => {
    const [tawafChannel, setTawafChannel] = useState([]);
    const [loadingTawafChannel, setLoadingTawafChannel] = useState(true);
    const [errorTawafChannel, setErrorTawafChannel] = useState(null);

    const loadTawafChannelData = useCallback(async () => {
        setLoadingTawafChannel(true);
        try {
            const response = await tawafChannelFetchApi();

            if (response.success) {
                setTawafChannel(response.data);
                setErrorTawafChannel(null);
            } else {
                setErrorTawafChannel(response.error);
            }
        } catch (err) {
            setErrorTawafChannel(err.message);
        } finally {
            setLoadingTawafChannel(false);
        }
    }, []);

    useEffect(() => {
        loadTawafChannelData();
    }, [loadTawafChannelData]);

    return {
        tawafChannel,
        loadingTawafChannel,
        errorTawafChannel,
        refetch: loadTawafChannelData,
    };
};

export default tawafChannelFetch;