import { useState, useEffect } from 'react';
import GetLocation from 'react-native-get-location'

const locationFetch = () => {
    const [location, setLocation] = useState([]);
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [errorLocation, setErrorLocation] = useState(null);

    useEffect(() => {
        const loadLocationData = async () => {
            try {
                GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 60000,
                })
                .then(location => {
                    setLocation(location);
                })
            } catch (err) {
                setErrorLocation(err.message);
            } finally {
                setLoadingLocation(false);
            }
        };
        loadLocationData();
    }, []);

    return { location, loadingLocation, errorLocation };
};

export default locationFetch;