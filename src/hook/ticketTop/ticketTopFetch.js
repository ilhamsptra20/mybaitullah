import { useState, useEffect } from 'react';
import fetchTicketTop from '../../api/apiTicketTop/apiTicketTop.js';

const ticketTopFetch = () => {
    const [ticketTop, setTicketTop] = useState([]);
    const [loadingTicketTop, setLoadingTicketTop] = useState(true);
    const [errorTicketTop, setErrorTicketTop] = useState(null);

    useEffect(() => {
        const loadTicketTopData = async () => {
            try {
                const response = fetchTicketTop;
                setTicketTop(response);
            } catch (err) {
                setErrorTicketTop(err.message);
            } finally {
                setLoadingTicketTop(false);
            }
        };
        loadTicketTopData();
    }, []);

    return { ticketTop, loadingTicketTop, errorTicketTop };
};

export default ticketTopFetch;