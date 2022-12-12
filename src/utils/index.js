export const convertTime24to12 = (time24h) => {
    let time = time24h.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time24h];

    if (time.length > 1) {
        time = time.slice(1, -1);
        time[5] = +time[0] < 12 ? "AM" : "PM";
        time[0] = +time[0] % 12 || 12;
    }
    return time.join("");
};
