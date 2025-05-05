import { useState, useEffect } from 'react';
import { tawafChannelFetchByHostApi } from '../../api/tawafChannelApi';

const myTawafChannelFetch = () => {
    const [myTawafChannel, setMyTawafChannel] = useState([]);
    const [loadingMyTawafChannel, setLoadingMyTawafChannel] = useState(true);
    const [errorMyTawafChannel, setErrorMyTawafChannel] = useState(null);

    useEffect(() => {
        const loadMyTawafChannelData = async () => {
            try {
                const response = await tawafChannelFetchByHostApi();
                setMyTawafChannel(response.data);
            } catch (err) {
                setErrorMyTawafChannel(err.message);
            } finally {
                setLoadingMyTawafChannel(false);
            }
        };
        loadMyTawafChannelData();
    }, []);

    return { myTawafChannel, loadingMyTawafChannel, errorMyTawafChannel };
};

export default myTawafChannelFetch;