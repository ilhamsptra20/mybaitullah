import { useState } from "react";
import { tawafChannelLeaveApi } from "../api/tawafChannelApi";

const useTawafChannelLeave = () => {
    const [loadingLeave, setLoadingLeave] = useState(false);
    const [errorLeave, setErrorLeave] = useState(null);

    const leaveChannel = async (channelId) => {
        setLoadingLeave(true);
        setErrorLeave(null);

        try {
            const response = await tawafChannelLeaveApi(channelId);

            if (response.success) {
                return { success: true, data: response.data };
            } else {
                setErrorLeave(response.error);
                return { success: false, error: response.error };
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to leave voice channel";
            setErrorLeave(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoadingLeave(false);
        }
    };

    return { leaveChannel, loadingLeave, errorLeave };
};

export default useTawafChannelLeave;