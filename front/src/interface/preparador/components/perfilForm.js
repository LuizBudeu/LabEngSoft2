import React, { useState } from "react";
import { Column } from "../../../components/column";
import { CustomInput } from "../../../components/customInput";
import { CustomButton } from "../../../components/customButton";
import { UpdateProfile } from "../../../contoller/preparador/PerfilController";
import { useAxiosWithToken } from "../../../utils/useAxiosWithToken";
import { useSearchParams } from "react-router-dom";

export const PerfilForm = ({perfil, onSubmit}) => {
    const [userInfo, setUserInfo] = useState({...perfil});
    const { update } = UpdateProfile(userInfo);


    const perfilItem = (infoKey) => {
        return(
            <Column>
                <text>{infoKey}</text>
                <CustomInput
                    name={infoKey}
                    onChange={(e) => setUserInfo({...userInfo, [infoKey]:e.target.value})}
                    value={userInfo[infoKey]}
                    type="text"
                    required
                />
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
            <Column>
                {Object.keys(userInfo).map(perfilItem)}
            </Column>
            <CustomButton type="primary" title="Salvar" isSubmit />
        </form>
    );
}