import React from "react";
import { FormatDate, GetHourMinute } from "../utils/date";
import { AppointmentItem } from "./appointmentItem";

export const AgendaList = ({professionalType, appointments, selectedAppointment, onItemClick}) => {

    const appointmentItem = (item) => (
        <AppointmentItem
            type={professionalType}
            text={GetHourMinute(item.horario, item.duracao) + " - " + item.paciente__nome}
            status={item.status}
            onClick={() => onItemClick(item)}
            selected={selectedAppointment?.id === item.id}
        />
    );
    
    return(
        <>
        {Object.entries(appointments).map(([date, dailyAppts], index) => (
            <div key={index}>
                <h3>{FormatDate(date)}</h3>
                <div>
                    {dailyAppts.map(appointmentItem)}
                </div>
            </div>
        ))}
        </>
    );
};
