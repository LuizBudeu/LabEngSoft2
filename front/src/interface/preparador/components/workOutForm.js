import React, { useState } from "react";
import { CustomButton } from "../../../components/customButton";
import { Column } from "../../../components/column";
import { CustomInput } from "../../../components/customInput";
import { CustomTextArea } from "../../../components/customTextArea";
import { CreateWorkOut } from "../../../contoller/preparador/WorkOutController";

export const WorkOutForm = ({onSubmit}) => {
    const [workOut, setWorkOut] = useState({title: "", workout: ""});

    const submit = async (e) => {
      e.preventDefault(); 
      console.log("O formulário foi submetido", e.target);
      const resp = await CreateWorkOut("3", workOut); 
      if(resp){
        onSubmit();
      }else{
        alert("Erro ao salvar os dados");
      }
    };

    return(
        <form onSubmit={submit}>
            <Column>  
                <Column>
                  <body>Título do treino</body>
                  <CustomInput
                    name="title"
                    onChange={(e) => setWorkOut({...workOut, title:e.target.value})}
                    value={workOut.title}
                    type="text"
                  />
                </Column>
                <Column>
                  <body>Descrição do treino</body>
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