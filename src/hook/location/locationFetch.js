import { useState, useEffect } from 'react';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
import { API_GOOGLE_KEY } from '../../config';



const GOOGLE_API_KEY = API_GOOGLE_KEY; // Pastikan API Key benar

const useLocationFetch = () => {
    const [location, setLocation] = useState(null);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            setLoading(true);
            try {
                const loc = await GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 60000,
                });

                setLocation(loc);

                // Panggil API Google Maps untuk mendapatkan nama kota
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json`,
                    {
                        params: {
                            latlng: `${loc.latitude},${loc.longitude}`,
                            key: GOOGLE_API_KEY,
                        },
                    },
                );

                if (response.data.results.length > 0) {
                    const addressComponents =
                        response.data.results[0].address_components;

                    // Cari nama kota dengan urutan prioritas: locality > sublocality > admin_area_level_2
                    const cityComponent =
                        addressComponents.find(component =>
                            component.types.includes('locality'),
                        ) ||
                        addressComponents.find(component =>
                            component.types.includes('sublocality'),
                        ) ||
                        addressComponents.find(component =>
                            component.types.includes(
                                'administrative_area_level_2',
                            ),
                        );

                    // Jika tetap tidak ditemukan, coba ambil negara untuk memastikan lokasi ada
                    if (!cityComponent) {
                        console.warn(
                            'Nama kota tidak ditemukan, mencoba fallback ke negara.',
                        );
                        const countryComponent = addressComponents.find(
                            component => component.types.includes('country'),
                        );
                        setCity(
                            countryComponent
                                ? `Di ${countryComponent.long_name}`
                                : 'Lokasi tidak ditemukan',
                        );
                    } else {
                        setCity(cityComponent.long_name);
                    }
                } else {
                    console.warn('Tidak ada hasil dari API Google Maps.');
                    setCity('Kota tidak ditemukan');
                }

                setError(null);
            } catch (err) {
                console.error('Error mendapatkan lokasi:', err);
                setError(err.message);
                setLocation(null);
                setCity('Gagal mendapatkan lokasi');
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, []);

    return { location, city, loading, error };
};

export default useLocationFetch;
