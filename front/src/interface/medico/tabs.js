import React, { useState } from "react";
import AgendaTab from "./AgendaTab";
import ExamesTab from "./ExamesTab";
import "./styles/Tabs.css";
import { SecondaryNavBar } from "../../components/secondaryNavBar";
import { MainContainer } from "../../components/mainContainer";
import { BackgroundContainer } from "../../components/backgroundContainer";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const tabs = [
        { id: "tab1", displayName: "Agenda" },
        { id: "tab2", displayName: "Exames" },
    ];

    return (
        <BackgroundContainer>
            <SecondaryNavBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <MainContainer>
                {activeTab === "tab1" && <AgendaTab />}
                {activeTab === "tab2" && <ExamesTab />}
            </MainContainer>
        </BackgroundContainer>
    );
};
export default Tabs;
