import React from "react";
import "./styles/Tabs.css";
import { groupByDate } from "../../utils/group";
import { AgendaList } from "../../components/agendaList";
import { MainContainer } from "../../components/mainContainer";
import { GetAgenda } from "../../contoller/medico/AgendaController";

const AgendaTab = () => {
    const [agenda, setAgenda] = GetAgenda("1", "2021-01-01", "2024-12-31");

    return(
        <MainContainer>
            <div className="vertical-box">
                <h2>Suas consultas</h2>
                {agenda && <AgendaList appointments={agenda}/>}
            </div>
            <div className="vertical-box">
                <span>Informações do fulano</span>
            </div>
        </MainContainer>
    );
};
export default AgendaTab;
