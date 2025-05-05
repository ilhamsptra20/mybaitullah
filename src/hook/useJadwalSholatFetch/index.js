import { useState, useEffect } from 'react';
import axios from 'axios';
import locationData from '../location/locationFetch';

const useJadwalSholatFetch = ({ date }) => {
    const { location, city, loadingLocation, errorLocation } = locationData();
    const [jadwalShalat, setJadwalShalat] = useState(null);
    const [jadwalShalatError, setJadwalShalatError] = useState(null);
    const [jadwalShalatLoading, setJadwalShalatLoading] = useState(true);

    useEffect(() => {
        if (loadingLocation) return;

        if (errorLocation) {
            setJadwalShalatError(errorLocation);
            setJadwalShalatLoading(false);
            return;
        }

        const latitude = location?.latitude;
        const longitude = location?.longitude;

        if (!latitude || !longitude || !date || !city) {
            setJadwalShalatError(
                'Latitude, longitude, date, and city are required',
            );
            setJadwalShalatLoading(false);
            return;
        }

        const fetchData = async () => {
            setJadwalShalatLoading(true);
            try {
                const response = await axios.get(
                    `https://api.aladhan.com/v1/timings/${encodeURIComponent(
                        date,
                    )}`,
                    {
                        params: {
                            latitude: Number(latitude),
                            longitude: Number(longitude),
                            method: 20,
                        },
                        validateStatus: status => status < 500,
                    },
                );

                if (response.status === 200 && response.data?.data?.timings) {
                    const timeMapping = {
                        Fajr: 'Subuh',
                        Dhuhr: 'Dzuhur',
                        Asr: 'Ashar',
                        Maghrib: 'Maghrib',
                        Isha: 'Isya',
                    };

                    const filteredTimings = Object.fromEntries(
                        Object.entries(response.data.data.timings)
                            .filter(([key]) => timeMapping[key]) // Hanya ambil yang ada di mapping
                            .map(([key, value]) => [timeMapping[key], value]) // Ganti key dengan yang baru
                    );

                    setJadwalShalat({
                        city,
                        timings: filteredTimings,
                        date,
                    });
                    setJadwalShalatError(null);
                } else {
                    setJadwalShalat(null);
                    setJadwalShalatError(
                        response.data?.status || 'Failed to fetch prayer times.'
                    );
                }
            } catch (err) {
                setJadwalShalat(null);
                setJadwalShalatError(err.message);
            } finally {
                setJadwalShalatLoading(false);
            }
        };

        fetchData();
    }, [location, loadingLocation, errorLocation, date, city]); // Tambahkan city ke dependensi

    return { jadwalShalat, jadwalShalatError, jadwalShalatLoading };
};

export default useJadwalSholatFetch;
