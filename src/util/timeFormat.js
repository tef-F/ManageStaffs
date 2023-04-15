var { format, getTime, formatDistanceToNow } = require('date-fns');

module.exports = {
    fDate: (date) => {
        return format(new Date(date), 'dd MMMM yyyy');
    },
    fDateTime: (date) => {
        return format(new Date(date), 'dd MMM yyyy HH:mm');
    },
    fTimestamp: (date) => {
        return getTime(new Date(date));
    },
    fDateTimeSuffix: (date) => {
        return format(new Date(date), 'dd/MM/yyyy hh:mm p');
    },
    fToNow: (date) => {
        return formatDistanceToNow(new Date(date), {
            addSuffix: true,
        });
    },
};
