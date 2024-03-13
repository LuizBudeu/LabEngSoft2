import React, { useState } from "react";
import { AgendaTab } from "./agendaTab";
import { TreinosTab } from "./treinosTab";

export const Tabs = () => {
    const [activeTab, setActiveTab] = useState("agenda");

    const handleAgendaTabTap = () => {
        setActiveTab("agenda");
    };

    const handleTreinosTabTap = () => {
        setActiveTab("treinos");
    };

    return (
        <div className="Tabs">
            <ul className="nav">
                <li className={activeTab === "agenda" ? "active" : ""} onClick={handleAgendaTabTap}>
                    <span>Agenda</span>
                </li>
                <li className={activeTab === "treinos" ? "active" : ""} onClick={handleTreinosTabTap}>
                    <span>Treinos</span>
                </li>
            </ul>
            <div className="tab-content">
                {activeTab === "agenda" && <AgendaTab />}
                {activeTab === "treinos" && <TreinosTab />}
            </div>
        </div>
    );
};