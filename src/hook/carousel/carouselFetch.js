import { useState, useEffect } from 'react';
import fetchCarousel from '../../api/apiCarousel/apiCarousel.js';

const carouselFetch = () => {
    const [carousel, setCarousel] = useState([]);
    const [loadingCarousel, setLoadingCarousel] = useState(true);
    const [errorCarousel, setErrorCarousel] = useState(null);

    useEffect(() => {
        const loadCarouselData = async () => {
            try {
                const response = fetchCarousel;
                setCarousel(response);
            } catch (err) {
                setErrorCarousel(err.message);
            } finally {
                setLoadingCarousel(false);
            }
        };
        loadCarouselData();
    }, []);

    return { carousel, loadingCarousel, errorCarousel };
};

export default carouselFetch;