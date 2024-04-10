import React, { useState } from "react";
import { CustomButton } from "../../../components/customButton";
import { Column } from "../../../components/column";
import { CustomInput } from "../../../components/customInput";
import { CustomTextArea } from "../../../components/customTextArea";
import { CreateWorkOut } from "../../../contoller/preparador/WorkOutController";

export const WorkOutForm = ({onSubmit}) => {
    const [workOut, setWorkOut] = useState({title: "", workout: ""});
    const { create } = CreateWorkOut(workOut);
  
    const submit = async (e) => {
      e.preventDefault(); 
      create({
        onSuccess: () => onSubmit(),
        onError: () => console.log("Erro ao salvar")
      });
    };

    return(
        <form onSubmit={submit}>
            <Column>  
                <Column>
                  <text>Título do treino</text>
                  <CustomInput
                    name="title"
                    onChange={(e) => setWorkOut({...workOut, title:e.target.value})}
                    value={workOut.title}
                    type="text"
                  />
                </Column>
                <Column>
                  <text>Descrição do treino</text>
                  <CustomTextArea
                    name="workout"
                    onChange={(e) => setWorkOut({...workOut, workout:e.target.value})}
                    value={workOut.workout}
                    type="text"
                    required
                  />
                </Column>
            </Column>
            <CustomButton title="Registrar treino" isSubmit type="primary" />
        </form>
    );
}