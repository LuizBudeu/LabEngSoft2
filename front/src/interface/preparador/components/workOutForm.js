import React, { useState } from "react";
import { CustomButton } from "../../../components/customButton";
import { Column } from "../../../components/column";
import { CustomInput } from "../../../components/customInput";
import { CustomTextArea } from "../../../components/customTextArea";
import { CreateWorkOut } from "../../../contoller/preparador/WorkOutController";
import { useAxiosWithToken } from "../../../utils/useAxiosWithToken";

export const WorkOutForm = ({onSubmit}) => {
    const [workOut, setWorkOut] = useState({title: "", workout: ""});
    const [axios] = useAxiosWithToken();

    const submit = async (e) => {
      e.preventDefault(); 

      const resp = await CreateWorkOut("3", workOut, axios); 
      
      if(resp) {
        onSubmit();
      } else {
        alert("Erro ao salvar os dados");
      }
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