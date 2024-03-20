import React from "react";
import { Colors } from "../utils/colors";
import { FormatDate, GetHourMinute } from "../utils/date";

export const AgendaList = ({appointments, selectedAppointment, onItemClick}) => {
    
    const appointmentItem = (item) => (
        <div 
            key={item.id} 
            onClick={() => onItemClick(item)}
            style={{'background-color': selectedAppointment.id === item.id ? Colors.LightGray : null}}
        >
          <table>
            <tr>
              <td>{item.paciente__nome} - {GetHourMinute(item.horario, item.duracao)}</td>
            </tr>
          </table>
        </div>
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
