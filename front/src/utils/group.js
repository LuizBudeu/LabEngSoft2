import { getBaseDate } from "./date";

export const GroupByDate = (appointments) => {
    const grouped = {};

    appointments.forEach(appt => {
        const horario = getBaseDate(appt.horario);
        if(!grouped[horario]) {
            grouped[horario] = [];
        }
        grouped[horario].push(appt);
    });

    return grouped;
};
