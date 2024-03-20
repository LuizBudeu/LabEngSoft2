import React, { useState } from "react";
import AgendaTab from "./AgendaTab";
import PerfilTab from "./PerfilTab";
import { MainContainer } from "../../components/mainContainer";
import { BackgroundContainer } from "../../components/backgroundContainer";
import { SecondaryNavBar } from "../../components/secondaryNavBar";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const tabs = [{
        id: "tab1",
        displayName: "Agenda"
     },
     {
        id: "tab2",
        displayName: "Perfil"
     }];

    return (
        <BackgroundContainer>
            <SecondaryNavBar
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <div>
                <MainContainer>
                    {activeTab === "tab1" && <AgendaTab />}
                    {activeTab === "tab2" && <PerfilTab />}
                </MainContainer>
            </div>
        </BackgroundContainer>
    );
};
export default Tabs;
