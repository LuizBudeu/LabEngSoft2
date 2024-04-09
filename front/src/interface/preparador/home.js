import React from "react";
import { useState } from "react";
import { SecondaryNavBar } from "../../components/secondaryNavBar";
import { AgendaTab } from "./agendaTab";
import { TreinosTab } from "./treinosTab";
import { MainContainer } from "../../components/mainContainer";
import { BackgroundContainer } from "../../components/backgroundContainer";
import { ENVIRONMENT } from "../../utils/utils";
import { useLogin } from "../../utils/useLogin";
import { useLogout } from "../../utils/useLogout";
import { PerfilTab } from "./perfilTab";
import { TopBar } from "../../components/TopBar";
import { Auth } from "../../contoller/preparador/PerfilController";
import { AnonymousPage } from "../../components/AnonymousPage";

const LOGIN_URL = process.env.REACT_APP_PREPARADOR_LOGIN_URL;
const AUTH_SECRET = process.env.REACT_APP_PREPARADOR_AUTH_SECRET;

export const PreparadorHome = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const loggedIn = useLogin(AUTH_SECRET);
    const logout = useLogout();
    const auth = Auth();
    
    const tabs = [
        {id: 'tab1', displayName: 'Agenda'},
        {id: 'tab2', displayName: 'Treinos'},
        {id: 'tab3', displayName: 'Perfil'},
    ];

    if (ENVIRONMENT === "prod" && !loggedIn) {
        return (
            <AnonymousPage
                text="Bem-vindo ao portal do preparador físico!"
                url={LOGIN_URL}
            />
        );
    }

    return (
        <BackgroundContainer>
            <TopBar/>
            <SecondaryNavBar
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <MainContainer>
                {activeTab === "tab1" && <AgendaTab />}
                {activeTab === "tab2" && <TreinosTab />}
                {activeTab === "tab3" && <PerfilTab />}
            </MainContainer>
            <button onClick={logout}>Logout</button>
        </BackgroundContainer>
    );
};