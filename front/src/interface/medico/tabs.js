import React, { useState } from "react";
import AgendaTab from "./AgendaTab";
import ExamesTab from "./ExamesTab";
import "./styles/Tabs.css";
import { SecondaryNavBar } from "../../components/secondaryNavBar";
import { MainContainer } from "../../components/mainContainer";
import { BackgroundContainer } from "../../components/backgroundContainer";
import { useLogout } from "../../utils/useLogout";
import { useLogin } from "../../utils/useLogin";
import { ENVIRONMENT } from "../../utils/utils";
import { AnonymousPage } from "../../components/AnonymousPage";
import {TopBar} from "../../components/TopBar";
import {Auth} from "../../contoller/medico/PerfilController";
import { PerfilTab} from "./perfilTab";

const LOGIN_URL = process.env.REACT_APP_MEDICO_LOGIN_URL;
const AUTH_SECRET = process.env.REACT_APP_MEDICO_AUTH_SECRET;

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const loggedIn = useLogin(AUTH_SECRET);
    const auth = Auth();
    const logout = useLogout();

    const tabs = [
        { id: "tab1", displayName: "Agenda" },
        { id: "tab2", displayName: "Exames" },
        {id: 'tab3', displayName: 'Perfil'},
    ];

    if (ENVIRONMENT === "prod" && !loggedIn)
        return (
            <AnonymousPage
                text="Bem-vindo ao portal do médico!"
                url={LOGIN_URL}
            />
        );

    return (
        <BackgroundContainer>
            <TopBar/>
            <SecondaryNavBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <MainContainer>
                {activeTab === "tab1" && <AgendaTab />}
                {activeTab === "tab2" && <ExamesTab />}
                {activeTab === "tab3" && <PerfilTab />}
            </MainContainer>
        </BackgroundContainer>
    );
};
export default Tabs;
