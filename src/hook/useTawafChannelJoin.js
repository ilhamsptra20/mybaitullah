import { useState } from "react";
import { tawafChannelJoinApi } from "../api/tawafChannelApi";

const useTawafChannelJoin = () => {
    const [loadingJoin, setLoadingJoin] = useState(false);
    const [errorJoin, setErrorJoin] = useState(null);

    const joinChannel = async (channelId, passcode = null) => {
        setLoadingJoin(true);
        setErrorJoin(null);

        try {
            const response = await tawafChannelJoinApi(channelId, passcode);

            if (response.success) {
                return { success: true, data: response.data };
            } else {
                setErrorJoin(response.error);
                return { success: false, error: response.error };
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to join voice channel";
            setErrorJoin(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoadingJoin(false);
        }
    };

    return { joinChannel, loadingJoin, errorJoin };
};

export default useTawafChannelJoin;