import React, { useState } from "react";
import { Column } from "../../../components/column";
import { CustomInput } from "../../../components/customInput";
import { CustomButton } from "../../../components/customButton";
import { UpdateProfile } from "../../../contoller/preparador/PerfilController";
import { useAxiosWithToken } from "../../../utils/useAxiosWithToken";

export const PerfilForm = ({perfil, onSubmit}) => {
    const [userInfo, setUserInfo] = useState({...perfil});
    const axios = useAxiosWithToken();

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
        const resp = await UpdateProfile("3", userInfo, axios);
        if(resp) {
            onSubmit();
          } else {
            alert("Erro ao salvar os dados")
          }
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