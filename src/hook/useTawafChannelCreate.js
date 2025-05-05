import React, { useState } from "react";
import { tawafChannelCerateApi } from "../api/tawafChannelApi";


const useTawafChannelCreate = () => {
    const [loadingCreateTawafChannel, setLoadingCreateTawafChannel] = useState(false);
    const [errorCreateTawafChannel, setErrorCreateTawafChannel] = useState(null);
    const [dataCreateTawafChannel, setDataCreateTawafChannel] = useState(null);

    const createTawafChannel = async (channelData) => {
        setLoadingCreateTawafChannel(true);
        setErrorCreateTawafChannel(null);

        try {
            const response = await tawafChannelCerateApi(channelData);

            if (response.success) {
                setDataCreateTawafChannel(response.data);
                return { success: true, data: response.data }; // Tambahkan data
            } else {
                setErrorCreateTawafChannel(response.error);
                return { success: false, error: response.error }; // Kembalikan error
            }
        } catch (err) {
            setErrorCreateTawafChannel(err.message);
        } finally {
            setLoadingCreateTawafChannel(false);
        }
    };

    return { createTawafChannel, loadingCreateTawafChannel, errorCreateTawafChannel, dataCreateTawafChannel };
};

export default useTawafChannelCreate;
