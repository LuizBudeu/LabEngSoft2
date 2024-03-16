
export const getBaseDate = (dateString) => dateString.split(' ')[0];

export const getHourFromDate = (dateString) => dateString.split(' ')[1];

export const getLabelDay = (dateString) => (new Date(dateString)).toDateString();