import { useState, useEffect } from 'react';
import fetchPromo from '../../api/apiPromo/apiPromo.js';

const promoFetch = () => {
    const [promo, setPromo] = useState([]);
    const [loadingPromo, setLoadingPromo] = useState(true);
    const [errorPromo, setErrorPromo] = useState(null);

    useEffect(() => {
        const loadPromoData = async () => {
            try {
                const response = fetchPromo;
                setPromo(response);
            } catch (err) {
                setErrorPromo(err.message);
            } finally {
                setLoadingPromo(false);
            }
        };
        loadPromoData();
    }, []);

    return { promo, loadingPromo, errorPromo };
};

export default promoFetch;