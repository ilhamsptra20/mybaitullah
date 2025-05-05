import { useState, useEffect } from 'react';
import fetchTicket from '../../api/apiTicket/apiTicket.js';

const ticketFetch = () => {
    const [ticket, setTicket] = useState([]);
    const [loadingTicket, setLoadingTicket] = useState(true);
    const [errorTicket, setErrorTicket] = useState(null);

    useEffect(() => {
        const loadTicketData = async () => {
            try {
                const response = fetchTicket;
                setTicket(response);
            } catch (err) {
                setErrorTicket(err.message);
            } finally {
                setLoadingTicket(false);
            }
        };
        loadTicketData();
    }, []);

    return { ticket, loadingTicket, errorTicket };
};

export default ticketFetch;