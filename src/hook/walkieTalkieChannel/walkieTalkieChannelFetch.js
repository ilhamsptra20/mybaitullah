import { useState, useEffect } from 'react';
import fetchWalkieTalkieChannel from '../../api/apiMyWalkieTalkieChannel/apiMyWalkieTalkieChannel.js';

const walkieTalkieChannelFetch = () => {
    const [walkieTalkieChannel, setWalkieTalkieChannel] = useState([]);
    const [loadingWalkieTalkieChannel, setLoadingWalkieTalkieChannel] = useState(true);
    const [errorWalkieTalkieChannel, setErrorWalkieTalkieChannel] = useState(null);

    useEffect(() => {
        const loadWalkieTalkieChannelData = async () => {
            try {
                const response = fetchWalkieTalkieChannel;
                setWalkieTalkieChannel(response);
            } catch (err) {
                setErrorWalkieTalkieChannel(err.message);
            } finally {
                setLoadingWalkieTalkieChannel(false);
            }
        };
        loadWalkieTalkieChannelData();
    }, []);

    return { walkieTalkieChannel, loadingWalkieTalkieChannel, errorWalkieTalkieChannel };
};

export default walkieTalkieChannelFetch;