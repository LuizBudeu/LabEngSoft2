import React, { useState } from "react";
import { AgendaTab } from "./AgendaTab";
import PerfilTab from "./PerfilTab";
import { MainContainer } from "../../components/mainContainer";
import { BackgroundContainer } from "../../components/backgroundContainer";
import { SecondaryNavBar } from "../../components/secondaryNavBar";
import { useLogout } from "../../utils/useLogout";
import { useLogin } from "../../utils/useLogin";
import { ENVIRONMENT } from "../../utils/utils";
import { AnonymousPage } from "../../components/AnonymousPage";
import { TopBar } from "../../components/TopBar";

const LOGIN_URL = process.env.REACT_APP_NUTRICIONISTA_LOGIN_URL;
const AUTH_SECRET = process.env.REACT_APP_NUTRICIONISTA_AUTH_SECRET;

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const loggedIn = useLogin(AUTH_SECRET, "nutricionista");

    const tabs = [{
        id: "tab1",
        displayName: "Agenda"
     },
     {
        id: "tab2",
        displayName: "Perfil"
     }];

     if (ENVIRONMENT === "prod" && !loggedIn)
     return (
        <AnonymousPage
            text="Bem-vindo ao portal do nutricionista!"
            url={LOGIN_URL}
        />
     );

    return (
        <BackgroundContainer>
            <TopBar type="nutricionista"/>
            <SecondaryNavBar
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <div style={{height: "71%"}}>
                <MainContainer>
                    {activeTab === "tab1" && <AgendaTab />}
                    {activeTab === "tab2" && <PerfilTab />}
                </MainContainer>
            </div>
        </BackgroundContainer>
    );
};
export default Tabs;
