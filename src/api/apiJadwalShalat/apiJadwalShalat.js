import axios from 'axios';

const apiJadwalShalat = async ({ latitude, longitude, date }) => {
  try {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timings/${encodeURIComponent(date)}`,
      {
        params: {
          latitude: Number(latitude),
          longitude: Number(longitude),
          method: 20,
        },
        validateStatus: status => status < 500, // Anggap status <500 masih bisa di-handle
      },
    );

    if (response.status === 200 && response.data?.data?.timings) {
      return { data: response.data.data.timings, error: null };
    } else {
      return {
        data: null,
        error: response.data?.status || 'Failed to fetch prayer times.',
      };
    }
  } catch (err) {
    return { data: null, error: err.message };
  }
};

export default apiJadwalShalat;
