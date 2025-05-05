import axios from "axios";

const apiJadwalShalat = async ({ latitude, longitude, date }) => {
  try {
    const response = await axios.get(`https://api.aladhan.com/v1/timings/${date}`, {
      params: { latitude, longitude, method: 2 },
    });

    if (response.status === 200) {
      return { data: response.data.data.timings, error: null };
    } else {
      return { data: null, error: "Failed to fetch prayer times." };
    }
  } catch (err) {
    return { data: null, error: err.message };
  }
};

export default apiJadwalShalat;
