import React, { useState } from "react";
import { GetProfile } from "../../contoller/preparador/PerfilController";
import { PopUpContainer } from "../../components/popUpContainer";
import { CustomButton } from "../../components/customButton";
import { PerfilForm } from "./components/perfilForm";
import { FormContainer } from "../../components/formContainer";
import { ProfileFieldToLabel } from "../../utils/utils";
import { VSpace } from "../../components/vSpace";

export const PerfilTab = () => {
    const { userProfile, refetch } = GetProfile();
    const [showPopUp, setShowPopUp] = useState(false);
    
    const handleSubmit = () => {
        refetch();
        setShowPopUp(false);
    }

    return(
        <div>
            <PopUpContainer showPopUp={showPopUp} closePopUp={() => setShowPopUp(false)}>
                <FormContainer>
                    <PerfilForm perfil={userProfile} onSubmit={handleSubmit}/>
                </FormContainer>
            </PopUpContainer>
            <h2>Seu perfil</h2>
            {userProfile && (
                <>
                    {Object.entries(userProfile).map(userInfo => (
                        <div>
                            <b>{ProfileFieldToLabel[userInfo[0]] + ": "}</b>
                            <text>{userInfo[1]}</text>
                            <VSpace />
                        </div>
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