import React, { useState } from "react";
import AgendaTab from "./AgendaTab";
import PerfilTab from "./PerfilTab";
import ExamesTab from "./ExamesTab";
import { Colors } from "../../utils/colors";
import "./styles/Tabs.css";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {
        setActiveTab("tab1");
    };

    const handleTab2 = () => {
        setActiveTab("tab2");
    };

    const handleTab3 = () => {
        setActiveTab("tab3");
    };

    return (
        <div className="vertical-box">
            <ul className="nav">
                <li className={activeTab === "tab1" ? "active" : ""} onClick={handleTab1}>
                    <span>Agenda</span>
                </li>
                <li className={activeTab === "tab2" ? "active" : ""} onClick={handleTab2}>
                    <span>Exames</span>
                </li>
                <li className={activeTab === "tab3" ? "active" : ""} onClick={handleTab3}>
                    <span>Perfil</span>
                </li>
            </ul>
            <div className="vertical-box" style={{backgroundColor: Colors.BackgroundGray}}>
                {activeTab === "tab1" && <AgendaTab />}
                {activeTab === "tab3" && <ExamesTab />}
                {activeTab === "tab2" && <PerfilTab />}
            </div>
        </div>
    );
};
export default Tabs;
