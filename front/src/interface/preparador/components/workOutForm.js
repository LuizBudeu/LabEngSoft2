import React, { useState } from "react";
import { CustomButton } from "../../../components/customButton";
import { Column } from "../../../components/column";
import { CustomInput } from "../../../components/customInput";
import { CustomTextArea } from "../../../components/customTextArea";

export const WorkOutForm = ({workOut, onSubmit}) => {
    const [workOutFielData, setWorkOutData] = useState({id: workOut?.id, titulo: workOut?.titulo, treino: workOut?.treino});
    console.log("form ",workOut)

    return(
        <form onSubmit={(e) => onSubmit(e, workOutFielData)}>
            <Column>  
                <Column>
                  <text>Título do treino</text>
                  <CustomInput
                    name="titulo"
                    onChange={(e) => setWorkOutData({...workOutFielData, titulo:e.target.value})}
                    value={workOutFielData.titulo}
                    type="text"
                  />
                </Column>
                <Column>
                  <text>Descrição do treino</text>
                  <CustomTextArea
                    name="treino"
                    onChange={(e) => setWorkOutData({...workOutFielData, treino:e.target.value})}
                    value={workOutFielData.treino}
                    type="text"
                    required
                  />
                </Column>
            </Column>
            <CustomButton title="Registrar treino" isSubmit type="primary" />
        </form>
    );
}