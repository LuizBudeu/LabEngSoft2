import React, { useState } from "react";
import { AgendaTab } from "./AgendaTab";
import PerfilTab from "./PerfilTab";
import { MainContainer } from "../../components/mainContainer";
import { BackgroundContainer } from "../../components/backgroundContainer";
import { SecondaryNavBar } from "../../components/secondaryNavBar";
import { useLogout } from "../../utils/useLogout";
import { useLogin } from "../../utils/useLogin";
import { ENVIRONMENT } from "../../utils/utils";

const LOGIN_URL = process.env.REACT_APP_NUTRICIONISTA_LOGIN_URL;
const AUTH_SECRET = process.env.REACT_APP_NUTRICIONISTA_AUTH_SECRET;

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const loggedIn = useLogin(AUTH_SECRET);
    const logout = useLogout();

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
         <>
             <p>Bem-vindo ao portal do médico!</p>
             <a href={LOGIN_URL}>Registre-se ou faça Login.</a>
         </>
     );

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
            <button onClick={logout}>Logout</button>
        </BackgroundContainer>
    );
};
export default Tabs;
