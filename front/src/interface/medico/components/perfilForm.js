import React, {useState} from "react";
import {Column} from "../../../components/column";
import {CustomInput} from "../../../components/customInput";
import {CustomButton} from "../../../components/customButton";
import {UpdateProfile} from "../../../contoller/medico/PerfilController";
import {ProfileFieldToLabel} from "../../../utils/utils";

export const PerfilForm = ({perfil, onSubmit}) => {
    const [userInfo, setUserInfo] = useState({...perfil});
    const {update} = UpdateProfile(userInfo);


    const perfilItem = (infoKey) => {
        return (
            <Column>
                <b style={{marginTop: 10}}>{ProfileFieldToLabel[infoKey]}</b>
                <CustomInput
                    name={infoKey}
                    onChange={(e) => setUserInfo({...userInfo, [infoKey]: e.target.value})}
                    value={userInfo[infoKey]}
                    type="text"
                    notRequired
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

    return (
        <form onSubmit={submit}>
            <Column>
                {Object.keys(userInfo).map(perfilItem)}
            </Column>
            <CustomButton type="primary" title="Salvar" isSubmit/>
        </form>
    );
}