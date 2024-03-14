import React from "react";
import { GetAgenda } from "../../contoller/medico/AgendaController";

const AgendaTab = () => {
    const [agenda] = GetAgenda("1", "2021-01-01", "2024-12-31");

    return <div className="AgendaTab">{JSON.stringify(agenda)}</div>;
};
export default AgendaTab;
