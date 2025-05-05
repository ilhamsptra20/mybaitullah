import { useState, useEffect } from 'react';
import fetchQrCode from '../../api/apiQrCode/apiQrCode.js';

const qrCodeFetch = () => {
    const [qrCode, setQrCode] = useState([]);
    const [loadingQrCode, setLoadingQrCode] = useState(true);
    const [errorQrCode, setErrorQrCode] = useState(null);

    useEffect(() => {
        const loadQrCodeData = async () => {
            try {
                const response = fetchQrCode;
                setQrCode(response);
            } catch (err) {
                setErrorQrCode(err.message);
            } finally {
                setLoadingQrCode(false);
            }
        };
        loadQrCodeData();
    }, []);

    return { qrCode, loadingQrCode, errorQrCode };
};

export default qrCodeFetch;