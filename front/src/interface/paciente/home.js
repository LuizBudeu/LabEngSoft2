import React, { useState } from "react";
import Agenda from "./agenda";
import Perfil from "./perfil";
import Acompanhamento from "./acompanhamento";
import { MainContainer } from "../../components/mainContainer";
import { BackgroundContainer } from "../../components/backgroundContainer";
import { SecondaryNavBar } from "../../components/secondaryNavBar";
import { useLogin } from "../../utils/useLogin";
import { useLogout } from "../../utils/useLogout";
import { ENVIROMENT } from "../../utils/utils";

const LOGIN_URL = process.env.REACT_APP_PACIENTE_LOGIN_URL;
const PACIENTE_AUTH_SECRET = process.env.REACT_APP_PACIENTE_AUTH_SECRET;

export const PacienteHome = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const loggedIn = useLogin(PACIENTE_AUTH_SECRET);
    const logout = useLogout();

    const tabs = [
        {
            id: "tab1",
            displayName: "Agenda",
        },
        {
            id: "tab2",
            displayName: "Acompanhamento",
        },
        {
            id: "tab3",
            displayName: "Perfil",
        },
    ];

    const handleTab1 = () => {
        setActiveTab("tab1");
    };

    const handleTab2 = () => {
        setActiveTab("tab2");
    };

    const handleTab3 = () => {
        setActiveTab("tab3");
    };

    if (ENVIROMENT === "prod" && !loggedIn)
        return (
            <>
                <p>Bem-vindo ao portal do paciente!</p>
                <a href={LOGIN_URL}>Registre-se ou faça Login.</a>
            </>
        );

    return (
        <BackgroundContainer>
            <SecondaryNavBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div>
                <MainContainer>
                    {activeTab === "tab1" && <Agenda />}
                    {activeTab === "tab2" && <Acompanhamento />}
                    {activeTab === "tab3" && <Perfil />}
                </MainContainer>
            </div>
            <button onClick={logout}>Logout</button>
        </BackgroundContainer>
    );
};
