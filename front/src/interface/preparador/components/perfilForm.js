import React, { useState } from "react";
import { Column } from "../../../components/column";

export const PerfilForm = ({perfil, setPerfil}) => {
    const [userInfo, setUserInfo] = useState(perfil);

    const perfilItem = ([label, info]) => {
        return(
            <div>{label + ": " + info}</div>
        );
    }

    return(
        <Column>
            {Object.entries(userInfo).map(perfilItem)}
        </Column>
    );
}