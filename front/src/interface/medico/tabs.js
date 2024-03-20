import React, { useState } from "react";
import AgendaTab from "./AgendaTab";
import PerfilTab from "./PerfilTab";
import ExamesTab from "./ExamesTab";
import { Colors } from "../../utils/colors";
import "./styles/Tabs.css";
import { SecondaryNavBar } from "../../components/secondaryNavBar";
import { MainContainer } from "../../components/mainContainer";
import { BackgroundContainer } from "../../components/backgroundContainer";


const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const tabs = [
        {id: 'tab1', displayName: 'Agenda'},
        {id: 'tab2', displayName: 'Exames'},
        {id: 'tab3', displayName: 'Perfil'},

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
                {activeTab === "tab2" && <ExamesTab />}
                {activeTab === "tab3" && <PerfilTab />}

            </MainContainer>
        </BackgroundContainer>
    );
};
export default Tabs;
