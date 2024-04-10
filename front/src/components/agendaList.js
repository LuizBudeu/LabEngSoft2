import React from "react";
import { Colors } from "../utils/colors";
import { FormatDate, GetHourMinute } from "../utils/date";
import { AppointmentItem } from "./appointmentItem";

export const AgendaList = ({appointments, selectedAppointment, onItemClick}) => {
    
    const appointmentItem = (item) => (
        <AppointmentItem
            type={item.type}
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
