import React, { useState } from "react";
import { GetProfile } from "../../contoller/preparador/PerfilController";
import { PopUpContainer } from "../../components/popUpContainer";
import { CustomButton } from "../../components/customButton";
import { PerfilForm } from "./components/perfilForm";
import { FormContainer } from "../../components/formContainer";

export const PerfilTab = () => {
    const [userProfile, setUserProfile] = GetProfile("3");
    const [showPopUp, setShowPopUp] = useState(false);

    return(
        <div>
            <PopUpContainer showPopUp={showPopUp} closePopUp={() => setShowPopUp(false)}>
                <FormContainer>
                    <PerfilForm perfil={userProfile} setPerfil={setUserProfile}/>
                </FormContainer>
            </PopUpContainer>
            {userProfile && (
                <>
                    {Object.entries(userProfile).map(userInfo => (
                        <div>{userInfo[0] + ": " + userInfo[1]}</div>
                    ))}
                </>
            )}
            <CustomButton
                title="Editat Perfil"
                type="primary"
                onClick={() => setShowPopUp(true)}
            />
        </div>
    );
}