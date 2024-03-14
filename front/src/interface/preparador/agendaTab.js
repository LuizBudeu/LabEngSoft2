import React from "react";
import "./styles/Tabs.css";
import { GetAgenda } from "../../contoller/preparador/AgendaController";
import { groupByDate } from "../../utils/group";

const appointments = [
    {name: 'V1', horario: '2024-03-20'},
    {name: 'V2', horario: '2024-03-20'},
    {name: 'V3', horario: '2024-03-21'},
    {name: 'V4', horario: '2024-03-21'},
    {name: 'V5', horario: '2024-03-22'},
]

export const AgendaTab = () => {
    // const [agenda] = GetAgenda("1", "2024-03-20", "2024-03-26");
    const appts = groupByDate(appointments);
    console.log(appts);

    return(
        <div className="main-container">
            <div className="vertical-box">
                <span>Horário agendado - Fulano</span>
                <span>Horário agendado - Fulano</span>
            </div>
            <div className="vertical-box">
                <span>Informações do fulano</span>
            </div>
        </div>
    );
};
