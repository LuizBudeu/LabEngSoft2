import React, { useState } from "react";
import { GetProfile } from "../../contoller/preparador/PerfilController";
import { PopUpContainer } from "../../components/popUpContainer";
import { CustomButton } from "../../components/customButton";
import { PerfilForm } from "./components/perfilForm";
import { FormContainer } from "../../components/formContainer";

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
            {userProfile && (
                <>
                    {Object.entries(userProfile).map(userInfo => (
                        <div><b>{userInfo[0] + ": "}</b><text>{userInfo[1]}</text></div>
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