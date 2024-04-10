import React, { useState } from "react";
import { CustomButton } from "../../../components/customButton";
import { Column } from "../../../components/column";
import { CustomInput } from "../../../components/customInput";
import { CustomTextArea } from "../../../components/customTextArea";
import { PedirExameMedico } from "../../../contoller/medico/ExameController";

export const PedidoExameForm = ({onSubmit}) => {
    const [pedidoExameTitulo, setPedidoExameTitulo] = useState("");

    const submit = async (e) => {
      e.preventDefault(); 

      const resp = await PedirExameMedico("1", pedidoExameTitulo);
      
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
                  <text>Título do exame</text>
                  <CustomInput
                    name="title"
                    onChange={(e) => setPedidoExameTitulo(e.target.value)}
                    value={pedidoExameTitulo}
                    type="text"
                  />
                </Column>
            </Column>
            <CustomButton title="Pedir exame" isSubmit type="primary" />
        </form>
    );
}