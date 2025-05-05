import React from "react";
import Axios from "../utils/axios";
import { getItem } from "../utils/localStorage";
import { formatDate } from "../utils/formatDate";

export const tawafChannelFetchApi = async () => {
    try {
        const response = await Axios.get('/voice-channels', {
            headers: {
                Authorization: `Bearer ${await getItem('token')}`,
            },
        });

        const formattedData = response.data.map((channel, index) => ({
            id: channel.id_channel_voice,
            image: null,
            channelName: channel.nama_channel || 'Unknown Channel',
            channelCode: channel.kode_channel,
            hostName: channel.host?.name || 'Unknown Host',
            travelName: channel.id_travel ? 'Travel Name Placeholder' : 'Default Travel',
            period: {
                date: channel.selesai_channel,
                time: "00:00",
            },
            passCode: channel.passcode,
        }));


        return { success: true, data: formattedData };
    } catch (err) {
        console.error('Error fetching voice channels:', err);
        return { success: false, error: err.response?.data?.message || 'Failed to fetch voice channels' };
    }
};

export const tawafChannelOnlineFetchApi = async () => {
    try {
        const response = await Axios.get('/voice-channels/online', {
            headers: {
                Authorization: `Bearer ${await getItem('token')}`,
            },
        });


        if (response.data.length === 0) {
            return { success: true, data: null };
        }

        const formattedData = response.data.map((channel, index) => ({
            id: channel.id_channel_voice,
            image: null,
            channelName: channel.nama_channel || 'Unknown Channel',
            channelCode: channel.kode_channel,
            hostName: channel.host?.name || 'Unknown Host',
            travelName: channel.id_travel ? 'Travel Name Placeholder' : 'Default Travel',
            period: {
                date: channel.selesai_channel,
                time: "00:00",
            },
            passCode: channel.passcode,
        }));

        return { success: true, data: formattedData };
    } catch (err) {
        console.error('Error fetching online voice channels:', err);
        return { success: false, error: err.response?.data?.message || 'Failed to fetch online voice channels' };
    }
};

export const tawafChannelSearchFetchApi = async (searchKeyword = '') => {
    try {
        const response = await Axios.get('/search-voice-channels', {
            headers: {
                Authorization: `Bearer ${await getItem('token')}`,
            },
            params: {
                keyboard: searchKeyword, // <== kirim keyword pencarian
            },
        });

        const formattedData = response.data.map((channel, index) => ({
            id: channel.id_channel_voice,
            image: null,
            channelName: channel.nama_channel || 'Unknown Channel',
            channelCode: channel.kode_channel,
            hostName: channel.host?.name || 'Unknown Host',
            travelName: channel.id_travel ? 'Travel Name Placeholder' : 'Default Travel',
            period: {
                date: channel.selesai_channel,
                time: "00:00",
            },
            passCode: channel.passcode,
        }));

        return { success: true, data: formattedData };
    } catch (err) {
        console.error('Error fetching voice channels:', err);
        return { success: false, error: err.response?.data?.message || 'Failed to fetch voice channels' };
    }
};

export const tawafChannelFetchByHostApi = async () => {
    try {
        const response = await Axios.get('/voice-channels/host', {
            headers: {
                Authorization: `Bearer ${await getItem('token')}`,
            },
        });

        const formattedData = response.data.map((channel, index) => ({
            id: channel.id_channel_voice,
            image: null,
            channelName: channel.nama_channel || 'Unknown Channel',
            channelCode: channel.kode_channel,
            hostName: channel.host?.name || 'Unknown Host',
            travelName: channel.id_travel ? 'Travel Name Placeholder' : 'Default Travel',
            period: {
                date: channel.selesai_channel,
                time: "00:00",
            },
            passCode: channel.passcode,
        }));

        return { success: true, data: formattedData };
    } catch (err) {
        console.error('Error fetching voice channels:', err);
        return { success: false, error: err.response?.data?.message || 'Failed to fetch voice channels' };
    }
};

export const tawafChannelCerateApi = async (channelData) => {
    try {
        const response = await Axios.post('/voice-channels/create', channelData, {
            headers: {
                Authorization: `Bearer ${await getItem('token')}`,
            }
        });
        return { success: true, data: response.data };
    } catch (err) {
        console.error('Error creating voice channel:', err);
        return { success: false, error: err.response?.data?.message || 'Failed to create voice channel' };
    }
};

export const tawafChannelJoinApi = async (channelId, passcode = null) => {
    try {
        const response = await Axios.post(`/voice-channels/${channelId}/join`,
            { passcode },
            {
                headers: {
                    Authorization: `Bearer ${await getItem('token')}`,
                }
            });
        return { success: true, data: response.data };
    } catch (err) {
        console.error('Error joining voice channel:', err);
        return { success: false, error: err.response?.data?.message || 'Failed to join voice channel' };
    }
};

export const tawafChannelLeaveApi = async (channelId) => {
    try {
        const response = await Axios.post(`/voice-channels/${channelId}/leave`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${await getItem('token')}`,
                }
            });
        return { success: true, data: response.data };
    } catch (err) {
        console.error('Error leaving voice channel:', err);
        return { success: false, error: err.response?.data?.message || 'Failed to leave voice channel' };
    }
};

