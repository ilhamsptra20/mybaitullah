import { useState, useEffect, useCallback } from 'react';
import { tawafChannelOnlineFetchApi } from '../api/tawafChannelApi.js';

const useTawafChannelOnline = () => {
    const [tawafChannelOnline, setTawafChannelOnline] = useState([]);
    const [loadingTawafChannelOnlineTawafChannelOnline, setLoadingTawafChannelOnline] = useState(true);
    const [errorTawafChannelOnlineTawafChannelOnline, setErrorTawafChannelOnline] = useState(null);

    const loadTawafChannelData = useCallback(async () => {
        setLoadingTawafChannelOnline(true);
        try {
            const response = await tawafChannelOnlineFetchApi();

            if (response.success) {
                setTawafChannelOnline(response.data);
                setErrorTawafChannelOnline(null);
            } else {
                setErrorTawafChannelOnline(response.error);
            }
        } catch (err) {
            setErrorTawafChannelOnline(err.message);
        } finally {
            setLoadingTawafChannelOnline(false);
        }
    }, []);

    useEffect(() => {
        loadTawafChannelData();
    }, [loadTawafChannelData]);

    return {
        tawafChannelOnline,
        loadingTawafChannelOnlineTawafChannelOnline,
        errorTawafChannelOnlineTawafChannelOnline,
        refetchChannelOnline: loadTawafChannelData,
    };
};

export default useTawafChannelOnline;