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

const LOGIN_URL = process.env.REACT_APP_MEDICO_LOGIN_URL;
const AUTH_SECRET = process.env.REACT_APP_MEDICO_AUTH_SECRET;

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const loggedIn = useLogin(AUTH_SECRET, "medico");
    const logout = useLogout();

    const tabs = [
        { id: "tab1", displayName: "Agenda" },
        { id: "tab2", displayName: "Exames" },
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
            <SecondaryNavBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <MainContainer>
                {activeTab === "tab1" && <AgendaTab />}
                {activeTab === "tab2" && <ExamesTab />}
            </MainContainer>
            <button onClick={logout}>Logout</button>
        </BackgroundContainer>
    );
};
export default Tabs;
