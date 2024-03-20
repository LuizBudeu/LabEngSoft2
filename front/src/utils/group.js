import { getBaseDate } from "./date";

export const groupByDate = (appointments) => {
    const grouped = {};

    appointments.forEach(appt => {
        const horario = getBaseDate(appt.horario);
        console.log(horario)
        if(!grouped[horario]) {
            grouped[horario] = [];
        }
        grouped[horario].push(appt);
    });

    return grouped;
};
