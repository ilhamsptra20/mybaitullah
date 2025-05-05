import { useState, useEffect } from 'react';
import axios from "axios";

const jadwalShalatFetch = ({latitude, longitude}) => {
    const [jadwalShalat, setJadwalShalat] = useState(null);
    const [loadingJadwalShalat, setLoadingJadwalShalat] = useState(true);
    const [errorJadwalShalat, setErrorJadwalShalat] = useState(null);

    useEffect(() => {
        const fetchPrayerTimes = async () => {
            try {
                const today = new Date().toISOString().split("T")[0]; // Format tanggal yyyy-mm-dd

                const response = await axios.get(
                    `https://api.aladhan.com/v1/timings/${today}`,
                    {
                        params: {
                        latitude: latitude,
                        longitude: longitude,
                        method: 2, // Metode ISNA
                        },
                    }
                );

                if (response.status === 200) {
                    setJadwalShalat(response.data.data.timings);
                    setLoadingJadwalShalat(false);
                } else {
                    setErrorJadwalShalat("Failed to fetch prayer times.");
                }

                console.log(loadingJadwalShalat)
                console.log(latitude, longitude)
            } catch (err) {
                setErrorJadwalShalat(err.data);
            }
        };

        fetchPrayerTimes();
    }, []);

    return { jadwalShalat, loadingJadwalShalat, errorJadwalShalat };
};

export default jadwalShalatFetch;