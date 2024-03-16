import React, { useState } from "react";
import { AgendaTab } from "./agendaTab";
import { TreinosTab } from "./treinosTab";
import { Colors } from "../../utils/colors";
import "./styles/Tabs.css";

export const Tabs = () => {
    const [activeTab, setActiveTab] = useState("agenda");

    const handleAgendaTabTap = () => {
        setActiveTab("agenda");
    };

    const handleTreinosTabTap = () => {
        setActiveTab("treinos");
    };

    return (
        <div className="vertical-box">
            <ul className="nav">
                <li className={activeTab === "agenda" ? "active" : ""} onClick={handleAgendaTabTap}>
                    <span>Agenda</span>
                </li>
                <li className={activeTab === "treinos" ? "active" : ""} onClick={handleTreinosTabTap}>
                    <span>Treinos</span>
                </li>
            </ul>
            <div className="vertical-box" style={{backgroundColor: Colors.BackgroundGray}}>
                {activeTab === "agenda" && <AgendaTab />}
                {activeTab === "treinos" && <TreinosTab />}
            </div>
        </div>
    );
};