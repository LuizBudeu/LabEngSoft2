import React from "react";
import { getHourFromDate, getLabelDay } from "../utils/date";

export const AgendaList = ({appointments}) => {
    
    const appointmentItem = (item, index) => (
        <li key={index}>
            {item.name} - {getHourFromDate(item.horario)}
        </li>
    );
    
    return(
        <>
        {Object.entries(appointments).map(([date, dailyAppts], index) => (
            <div key={index}>
                <h3>{getLabelDay(date)}</h3>
                <ul>
                    {dailyAppts.map(appointmentItem)}
                </ul>
            </div>
        ))}
        </>
    );
};
