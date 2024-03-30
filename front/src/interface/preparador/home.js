import React from "react";
import { useState } from "react";
import { SecondaryNavBar } from "../../components/secondaryNavBar";
import { AgendaTab } from "./agendaTab";
import { TreinosTab } from "./treinosTab";
import { MainContainer } from "../../components/mainContainer";
import { BackgroundContainer } from "../../components/backgroundContainer";

export const PreparadorHome = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const tabs = [
        {id: 'tab1', displayName: 'Agenda'},
        {id: 'tab2', displayName: 'Treinos'},
    ];

    return (
        <BackgroundContainer>
            <SecondaryNavBar
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <MainContainer>
                {activeTab === "tab1" && <AgendaTab />}
                {activeTab === "tab2" && <TreinosTab />}
            </MainContainer>
        </BackgroundContainer>
    );
};