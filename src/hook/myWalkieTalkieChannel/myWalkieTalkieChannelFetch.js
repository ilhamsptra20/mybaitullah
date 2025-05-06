import { useState, useEffect } from 'react';
import fetchMyWalkieTalkieChannel from '../../api/apiMyWalkieTalkieChannel/apiMyWalkieTalkieChannel.js';

const myWalkieTalkieChannelFetch = () => {
    const [myWalkieTalkieChannel, setMyWalkieTalkieChannel] = useState([]);
    const [loadingMyWalkieTalkieChannel, setLoadingMyWalkieTalkieChannel] = useState(true);
    const [errorMyWalkieTalkieChannel, setErrorMyWalkieTalkieChannel] = useState(null);

    useEffect(() => {
        const loadMyWalkieTalkieChannelData = async () => {
            try {
                const response = fetchMyWalkieTalkieChannel;
                setMyWalkieTalkieChannel(response);
            } catch (err) {
                setErrorMyWalkieTalkieChannel(err.message);
            } finally {
                setLoadingMyWalkieTalkieChannel(false);
            }
        };
        loadMyWalkieTalkieChannelData();
    }, []);

    return { myWalkieTalkieChannel, loadingMyWalkieTalkieChannel, errorMyWalkieTalkieChannel };
};

export default myWalkieTalkieChannelFetch;