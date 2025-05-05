import { useState, useEffect } from 'react';
import fetchPesanan from '../../api/apiPesanan/apiPesanan.js';

const pesananFetch = () => {
    const [pesanan, setPesanan] = useState([]);
    const [loadingPesanan, setLoadingPesanan] = useState(true);
    const [errorPesanan, setErrorPesanan] = useState(null);

    useEffect(() => {
        const loadPesananData = async () => {
            try {
                const response = fetchPesanan;
                setPesanan(response);
            } catch (err) {
                setErrorPesanan(err.message);
            } finally {
                setLoadingPesanan(false);
            }
        };
        loadPesananData();
    }, []);

    return { pesanan, loadingPesanan, errorPesanan };
};

export default pesananFetch;