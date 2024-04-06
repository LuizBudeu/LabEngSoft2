import React, { useState } from "react";
import styled from 'styled-components';
import Agenda from "./agenda";
import Perfil from "./perfil";
import Acompanhamento from "./acompanhamento";
import { MainContainer } from "../../components/mainContainer";
import { BackgroundContainer } from "../../components/backgroundContainer";
import { SecondaryNavBar } from "../../components/secondaryNavBar";
import { useLogin } from "../../utils/useLogin";
import { ENVIRONMENT } from "../../utils/utils";
import { TopBar } from "../../components/TopBar";
import { Auth } from "../../contoller/paciente/AuthController";
import { CreatePerfil } from "./perfilCreate";

const LOGIN_URL = process.env.REACT_APP_PACIENTE_LOGIN_URL;
const AUTH_SECRET = process.env.REACT_APP_PACIENTE_AUTH_SECRET;

export const PacienteHome = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const loggedIn = useLogin(AUTH_SECRET);
    const [userId, createProfile, userProfile, setUserProfile] = Auth();

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

    if (ENVIRONMENT === "prod" && !loggedIn){
        return (
            <>
                <p>Bem-vindo ao portal do paciente!</p>
                <a href={LOGIN_URL}>Registre-se ou faça Login.</a>
            </>
        );
    }else if(ENVIRONMENT === "prod" && !userId){
        return (
            <BackgroundContainer>
                <TopBar/>
                <MainContainer>
                    <CreatePerfil 
                        submitProfile={createProfile} 
                        userProfile={userProfile}
                        setUserProfile={setUserProfile}
                    />
                </MainContainer>   
            </BackgroundContainer>
        );
    }else{
        return (
            <BackgroundContainer>
                <TopBar/>
                <SecondaryNavBar
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <div style={{height: "71%"}}>
                <MainContainer>
                        {activeTab === "tab1" && <Agenda />}
                        {activeTab === "tab2" && <Acompanhamento />}
                        {activeTab === "tab3" && <Perfil />}
                    </MainContainer>   
                </div>
            </BackgroundContainer>
        );
    }
        

    
};
