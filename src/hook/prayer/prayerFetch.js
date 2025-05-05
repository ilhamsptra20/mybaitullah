import { useState, useEffect } from 'react';
import axios from 'axios';

const prayerFetch = () => {
    const [prayer, setPrayer] = useState([]);
    const [loadingPrayer, setLoadingPrayer] = useState(true);
    const [errorPrayer, setErrorPrayer] = useState(null);

    useEffect(() => {
        const loadPrayerData = async () => {
            try {
                const response = await axios.get('https://api.baitullah.co.id/api/doa/get_doa_bab');
                setPrayer(response.data);
            } catch (err) {
                setErrorPrayer(err.message);
            } finally {
                setLoadingPrayer(false);
            }
        };

        loadPrayerData();
    }, []);

    return { prayer, loadingPrayer, errorPrayer };
};

export default prayerFetch;