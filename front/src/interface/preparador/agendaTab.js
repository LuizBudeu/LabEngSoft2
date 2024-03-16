import React from "react";
import "./styles/Tabs.css";
import { groupByDate } from "../../utils/group";
import { AgendaList } from "../../components/agendaList";

const mockedAgenda = [
    {name: "Vinicius", horario: "2024-03-21 15:00:00"},
    {name: "Henrique", horario: "2024-03-21 16:00:00"},
    {name: "Luis", horario: "2024-03-22 13:00:00"},
    {name: "Felipe", horario: "2024-03-23 10:00:00"},
    {name: "Rafael", horario: "2024-03-23 11:00:00"},
];

export const AgendaTab = () => {
    // const [agenda] = GetAgenda("1", "2024-03-20", "2024-03-26");
    const appts = groupByDate(mockedAgenda);

    return(
        <div className="main-container">
            <div className="vertical-box">
                <h2>Suas consultas</h2>
                <AgendaList appointments={appts}/>
            </div>
            <div className="vertical-box">
                <span>Informações do fulano</span>
            </div>
        </div>
    );
};
