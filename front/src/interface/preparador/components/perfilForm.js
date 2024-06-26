import React, { useState } from "react";
import { Column } from "../../../components/column";
import { CustomInput } from "../../../components/customInput";
import { CustomButton } from "../../../components/customButton";
import { UpdateProfile } from "../../../contoller/preparador/PerfilController";
import { ProfileFieldToLabel } from "../../../utils/utils";
import { VSpace } from "../../../components/vSpace";

export const PerfilForm = ({perfil, onSubmit}) => {
    const [userInfo, setUserInfo] = useState({...perfil});
    const { update } = UpdateProfile(userInfo);


    const perfilItem = (infoKey) => {
        return(
            <Column>
                <text>{ProfileFieldToLabel[infoKey]}</text>
                <CustomInput
                    name={infoKey}
                    onChange={(e) => setUserInfo({...userInfo, [infoKey]:e.target.value})}
                    value={userInfo[infoKey]}
                    type="text"
                    required
                />
                <VSpace />
            </Column>
        );
    };

    const submit = async (e) => {
        e.preventDefault();
        update({
            onSuccess: () => onSubmit(),
            onError: () => console.log("Erro ao salvar dados")
        });
    };

    return(
        <form onSubmit={submit}>
            <h2>Editar Perfil</h2>
            <Column>
                {Object.keys(userInfo).map(perfilItem)}
            </Column>
            <CustomButton type="primary" title="Salvar" isSubmit />
        </form>
    );
}