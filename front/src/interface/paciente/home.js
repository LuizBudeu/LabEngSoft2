import React, { useState } from "react";
import Agenda from "./agenda";
import Perfil from "./perfil";
import Acompanhamento from "./acompanhamento";
import { MainContainer } from "../../components/mainContainer";
import { BackgroundContainer } from "../../components/backgroundContainer";
import { SecondaryNavBar } from "../../components/secondaryNavBar";

export const PacienteHome = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const tabs = [{
        id: "tab1",
        displayName: "Agenda"
     },
     {
        id: "tab2",
        displayName: "Acompanhamento"
     },
     {
        id: "tab3",
        displayName: "Perfil"
     }];

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
        <BackgroundContainer>
            <SecondaryNavBar
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <div>
                <MainContainer>
                    {activeTab === "tab1" && <Agenda />}
                    {activeTab === "tab2" && <Acompanhamento />}
                    {activeTab === "tab3" && <Perfil />}
                </MainContainer>
            </div>
        </BackgroundContainer>
    );
};
