import React, {useState} from "react";
import {CustomButton} from "../../../components/customButton";
import {Column} from "../../../components/column";
import {CustomInput} from "../../../components/customInput";
import {PedirExameMedico} from "../../../contoller/medico/ExameController";


export const PedidoExameForm = ({paciente_id, onSubmit}) => {
    const [pedidoExameTitulo, setPedidoExameTitulo] = useState("");
    const {create} = PedirExameMedico(paciente_id, pedidoExameTitulo);

    const submit = async (e) => {
        e.preventDefault();
        create({
            onSuccess: () => onSubmit(),
            onError: () => console.log("Erro ao salvar")
        });
    };

    return (
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
            <CustomButton title="Pedir exame" isSubmit type="primary"/>
        </form>
    );
}