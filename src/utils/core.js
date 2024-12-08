import dayjs from 'dayjs';

const adjustDateTimeForTimezone = (dateString) => {
    if (!dateString) return new Date();
    const dateUTC = dayjs.utc(dateString);
    const dateInUTCMinus = dateUTC.tz('America/Sao_Paulo');
    
    return dayjs(dateInUTCMinus.format());
};

const handleChange = (data, setData, value, field) => {
    const d = data;
    d[field].value = value
    setData(() => ({
        ...d
    }));
}

const getUser = () => {
    const user = localStorage.getItem("session");
    if(user !== 'null') {
        return JSON.parse(user)?.user
    }
    return null;
}

const calculateDuration = (startDate, type, endDate = null) => {
    const today = dayjs().startOf('day');
    const startDateUtc = dayjs.utc(startDate)
    const endDateUtc = endDate ? dayjs.utc(endDate) : today;

    switch(type) {
        case "days":
            const days = dayjs.duration(endDateUtc.diff(startDateUtc)).asDays();
        return days.toFixed(0);

        case "hours":
            const hours = dayjs.duration(endDateUtc.diff(startDateUtc)).asHours();
        return hours.toFixed(0);

        case "min":
            const min = dayjs.duration(endDateUtc.diff(startDateUtc)).asMinutes();
        return min.toFixed(0);

        default:
            const daysDefault = dayjs.duration(endDateUtc.diff(startDateUtc)).asMinutes();
        return daysDefault.toFixed(0);
    }
}

export {
    handleChange,
    adjustDateTimeForTimezone,
    calculateDuration,
    getUser
}