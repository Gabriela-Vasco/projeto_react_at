import dayjs from 'dayjs';
import { adjustDateTimeForTimezone, calculateDuration } from './core';

const handleInputChange = (field, value, data, setData) => {
    setData({...data, [field]: value})
}

const selectItem = (value, key, data, setData) => {
    setData({...data, [key]: value})  
}

const getSide = (side, translate) => {
    switch (side) {
        case 1:
        return translate('left');

        case 2:
        return translate('right')

        case 3:
        return translate('both')

        default:
        return translate('both')
    }
}

const subtitleDiaper = (data, translate) => {
    const hour = dayjs(adjustDateTimeForTimezone(data.start_date)).format('HH:mm');

    switch(data.type){
        case 1:
        return `${translate('diaper-wet')} ${translate('at')} ${hour}`;

        case 2:
        return `${translate('diaper-dirty')} ${translate('at')} ${hour}`;

        case 3:
        return `${translate('diaper-both')} ${translate('at')} ${hour}`;

        case 4:
        return `${translate('diaper-clean')} ${translate('at')} ${hour}`;

        default:
        return `${translate('diaper-clean')} ${translate('at')} ${hour}`;
    }
}

const subtitleSleep = (data, translate) => {
    const start_hour = dayjs(adjustDateTimeForTimezone(data.start_date));
    const end_hour = dayjs(adjustDateTimeForTimezone(data.end_date));

    const duration = calculateDuration(start_hour.format(), "hours", end_hour.format());
    return `${duration} ${translate('hours')} ${translate('from')} ${start_hour.format('HH:mm')} ${translate('to')} ${end_hour.format('HH:mm')}`;
}

const subtitleEat = (data, translate) => {
    const hour = dayjs(adjustDateTimeForTimezone(data.start_date)).format('HH:mm');
    if (data.type === 1) {
        return `${translate('start_time')}: ${hour}, ${data.quantity}ml`;
    } else {
        const start_hour = dayjs(adjustDateTimeForTimezone(data.start_date));
        const end_hour = dayjs(adjustDateTimeForTimezone(data.end_date));
        const duration = calculateDuration(start_hour.format(), "min", end_hour.format());

        return `${hour}, ${duration} ${translate('min')} ${getSide(data.side, translate)}`;
    }
}


const generateSubtitle = (item, translate) => {
    switch (item.action_type) {
        case 1:
        return subtitleSleep(item, translate);

        case 2:
        return subtitleEat(item, translate);

        case 3:
        return subtitleDiaper(item, translate);

        default:
        return subtitleSleep(item, translate);
    } 
}

const getTitle = (action_type) => {
    switch(action_type) {
        case "1":
        return "sleep";

        case "2":
        return "eat";

        case "3":
        return "diaper";

        default:
        return "eat";
    }
}

const validateDiaper = (data) => {
    return []
}

const validateSleep = (data) => {
    return []
}

const validateEat = (data) => {
    return []
}

const validateFields = (data, actionType) => {
    switch(actionType) {
        case "1":
        return validateSleep(data);

        case "2":
        return validateEat(data);

        case "3":
        return validateDiaper(data);

        default:
        return validateEat(data);
    }
}

export {
    handleInputChange,
    generateSubtitle,
    getTitle,
    selectItem,
    validateFields
}