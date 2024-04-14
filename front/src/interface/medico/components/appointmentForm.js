import React, {useState} from "react";
import {Column} from "../../../components/column";
import {CustomButton} from "../../../components/customButton";
import {CustomInput} from "../../../components/customInput";
import {RegistrarFormulario} from "../../../contoller/medico/ConsultaController";

export const AppointmentForm = ({consultaId, onSubmit, onCancel}) => {
    const [pacienteInfo, setPacientInfo] = useState({});
    const {registerForm} = RegistrarFormulario(consultaId, pacienteInfo);

    const submit = (e) => {
        e.preventDefault();
        registerForm({
            onSuccess: () => onSubmit(),
            onError: (error) => console.log(error)
        });
    }

    return (
        <form onSubmit={submit}>
            <h3>Relatório Médico</h3>
            <Column>
                <Column>
                    <text>Altura* [cm]</text>
                    <CustomInput
                        name="altura"
                        onChange={(e) => setPacientInfo({...pacienteInfo, altura: e.target.value})}
                        value={pacienteInfo.altura}
                        type="text"
                    />
                </Column>

                <Column>
                    <text>Massa* [kg]</text>
                    <CustomInput
                        name="massa"
                        onChange={(e) => setPacientInfo({...pacienteInfo, massa: e.target.value})}
                        value={pacienteInfo.massa}
                        type="text"
                    />
                </Column>

                <Column>
                    <text>Nível de açúcar no sangue</text>
                    <CustomInput
                        name="nivel_de_acucar_no_sangue"
                        value={pacienteInfo.nivel_de_acucar_no_sangue}
                        onChange={(e) => setPacientInfo({...pacienteInfo, nivel_de_acucar_no_sangue: e.target.value})}
                        type="text"
                        notRequired
                    />
                </Column>

                <Column>
                    <text>Gordura no fígado</text>
                    <CustomInput
                        name="gordura_no_figado"
                        onChange={(e) => setPacientInfo({...pacienteInfo, gordura_no_figado: e.target.value})}
                        value={pacienteInfo.gordura_no_figado}
                        type="text"
                        notRequired
                    />
                </Column>

                <Column>
                    <text>Hemoglobina glicada</text>
                    <CustomInput
                        name="hemoglobina_glicada"
                        onChange={(e) => setPacientInfo({...pacienteInfo, hemoglobina_glicada: e.target.value})}
                        value={pacienteInfo.hemoglobina_glicada}
                        type="text"
                        notRequired
                    />
                </Column>

                <Column>
                    <text>Produção de insulina</text>
                    <CustomInput
                        name="producao_de_insulina"
                        onChange={(e) => setPacientInfo({...pacienteInfo, producao_de_insulina: e.target.value})}
                        value={pacienteInfo.producao_de_insulina}
                        type="text"
                        notRequired
                    />
                </Column>

            </Column>
            <CustomButton title="Finalizar" isSubmit type="primary"/>
            <CustomButton title="Cancelar" onClick={onCancel}/>
        </form>
    );
}