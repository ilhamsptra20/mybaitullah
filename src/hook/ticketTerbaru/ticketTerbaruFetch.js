import { useState, useEffect } from 'react';
import fetchTicketTerbaru from '../../api/apiTicketTerbaru/apiTicketTerbaru.js';

const ticketTerbaruFetch = () => {
    const [ticketTerbaru, setTicketTerbaru] = useState([]);
    const [loadingTicketTerbaru, setLoadingTicketTerbaru] = useState(true);
    const [errorTicketTerbaru, setErrorTicketTerbaru] = useState(null);

    useEffect(() => {
        const loadTicketTerbaruData = async () => {
            try {
                const response = fetchTicketTerbaru;
                setTicketTerbaru(response);
            } catch (err) {
                setErrorTicketTerbaru(err.message);
            } finally {
                setLoadingTicketTerbaru(false);
            }
        };
        loadTicketTerbaruData();
    }, []);

    return { ticketTerbaru, loadingTicketTerbaru, errorTicketTerbaru };
};

export default ticketTerbaruFetch;