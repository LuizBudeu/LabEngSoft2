export const groupByDate = (appointments) => {
    const grouped = {};
    appointments.forEach(appt => {
        const horario = appt.horario;
        if(!grouped[horario]) {
            grouped[horario] = [];
        }
        grouped[horario].push(appt);
    });
    return grouped;
}