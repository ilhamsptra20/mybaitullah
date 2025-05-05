import React from "react";

export const formatDate = (date) => {
    const bulan = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const dateObj = new Date(date);
    const tanggalBaru = `${dateObj.getDate()} ${bulan[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

    return tanggalBaru;
};