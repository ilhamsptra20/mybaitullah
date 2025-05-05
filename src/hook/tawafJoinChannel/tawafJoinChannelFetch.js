import { useState, useEffect } from 'react';
import fetchTawafJoinChannel from '../../api/apiTawafJoinChannel/apiTawafJoinChannel.js';

const tawafJoinChannelFetch = () => {
    const [tawafJoinChannel, setTawafJoinChannel] = useState([]);
    const [loadingTawafJoinChannel, setLoadingTawafJoinChannel] = useState(true);
    const [errorTawafJoinChannel, setErrorTawafJoinChannel] = useState(null);

    useEffect(() => {
        const loadTawafJoinChannelData = async () => {
            try {
                const response = fetchTawafJoinChannel;
                setTawafJoinChannel(response);
            } catch (err) {
                setErrorTawafJoinChannel(err.message);
            } finally {
                setLoadingTawafJoinChannel(false);
            }
        };
        loadTawafJoinChannelData();
    }, []);

    return { tawafJoinChannel, loadingTawafJoinChannel, errorTawafJoinChannel };
};

export default tawafJoinChannelFetch;