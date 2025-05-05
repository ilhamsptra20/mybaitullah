import { useState, useEffect } from 'react';
import fetchTicketPilihan from '../../api/apiTicketPilihan/apiTicketPilihan.js';

const ticketPilihanFetch = () => {
    const [ticketPilihan, setTicketPilihan] = useState([]);
    const [loadingTicketPilihan, setLoadingTicketPilihan] = useState(true);
    const [errorTicketPilihan, setErrorTicketPilihan] = useState(null);

    useEffect(() => {
        const loadTicketPilihanData = async () => {
            try {
                const response = fetchTicketPilihan;
                setTicketPilihan(response);
            } catch (err) {
                setErrorTicketPilihan(err.message);
            } finally {
                setLoadingTicketPilihan(false);
            }
        };
        loadTicketPilihanData();
    }, []);

    return { ticketPilihan, loadingTicketPilihan, errorTicketPilihan };
};

export default ticketPilihanFetch;