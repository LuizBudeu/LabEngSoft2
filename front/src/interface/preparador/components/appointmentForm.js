import React, { useEffect, useState } from "react";
import { Column } from "../../../components/column";
import { CustomButton } from "../../../components/customButton";
import { CustomInput } from "../../../components/customInput";
import { CustomSelect } from "../../../components/customSelect";
import { NivelAtividade } from "../../../utils/options";
import { GetWorkOuts } from "../../../contoller/preparador/WorkOutController";
import { RegistrarFormulario } from "../../../contoller/preparador/ConsultaController";
import { VSpace } from "../../../components/vSpace";
import { Row } from "../../../components/row";
import { RowItem } from "../../../components/rowItem";
import { HSpace } from "../../../components/hSpace";

export const AppointmentForm = ({consultaId, onSubmit, onCancel}) => {
    const { workOuts } = GetWorkOuts();
    const [pacienteInfo, setPacientInfo] = useState({nivel_de_atividade_fisica: 0, treino_fisico: null});
    const { registerForm } = RegistrarFormulario(consultaId, pacienteInfo);

    const submit = (e) => {
        e.preventDefault();
        registerForm({
            onSuccess: () => onSubmit(),
            onError: (error) => console.log(error)
        });
    }

    useEffect(() => {
      setPacientInfo({...pacienteInfo, treino_fisico: workOuts?.[0]?.id ?? null})
    }, [workOuts]);
    
    const workOutsToSelector = (workouts) => {
        const workOutOptions = {}
        workouts.forEach(workout => {
            workOutOptions[workout.id] = workout.titulo;
        });
        return workOutOptions;
    };

    return(
        <form onSubmit={submit}>
            <Column>
                <h2>Formulário de Consulta</h2>
                <Column>
                  <text>Altura</text>
                  <CustomInput
                    name="altura"
                    onChange={(e) => setPacientInfo({...pacienteInfo, altura:e.target.value})}
                    value={pacienteInfo.altura}
                    type="text"
                    required
                  />
                </Column>
                <VSpace />

                <Column>
                  <text>Peso</text>
                  <CustomInput
                    name="massa"
                    onChange={(e) => setPacientInfo({...pacienteInfo, massa:e.target.value})}
                    value={pacienteInfo.massa}
                    type="text"
                    required
                  />
                </Column>
                <VSpace />

                <Column>
                    <text>Nível de atividade física</text>
                    <CustomSelect
                        list={NivelAtividade}
                        value={pacienteInfo.nivel_de_atividade_fisica}
                        onChange={(e) => setPacientInfo({...pacienteInfo, nivel_de_atividade_fisica:e.target.value})}
                    />
                </Column>
                <VSpace />

                <Column>
                  <text>Percentual de gordura</text>
                  <CustomInput
                    name="porcentagem_de_gordura"
                    onChange={(e) => setPacientInfo({...pacienteInfo, porcentagem_de_gordura:e.target.value})}
                    value={pacienteInfo.porcentagem_de_gordura}
                    type="text"
                    required
                  />
                </Column>
                <VSpace />

                <Column>
                  <text>Percentual de massa magra</text>
                  <CustomInput
                    name="porcentage_de_musculo"
                    onChange={(e) => setPacientInfo({...pacienteInfo, porcentage_de_musculo:e.target.value})}
                    value={pacienteInfo.porcentage_de_musculo}
                    type="text"
                    required
                  />
                </Column>
                <VSpace />

                <Column>
                  <text>Metabolismo basal</text>
                  <CustomInput
                    name="metabolismo_basal"
                    onChange={(e) => setPacientInfo({...pacienteInfo, metabolismo_basal:e.target.value})}
                    value={pacienteInfo.metabolismo_basal}
                    type="text"
                    required
                  />
                </Column>
                <VSpace />

                <Column>
                  <text>Gasto calórico</text>
                  <CustomInput
                    name="gasto_calorico"
                    onChange={(e) => setPacientInfo({...pacienteInfo, gasto_calorico:e.target.value})}
                    value={pacienteInfo.gasto_calorico}
                    type="text"
                    required
                  />
                </Column>
                <VSpace />

                {workOuts && (
                    <Column>
                        <text>Treino</text>
                        <CustomSelect
                            list={workOutsToSelector(workOuts)}
                            value={pacienteInfo.treino_fisico}
                            onChange={(e) => setPacientInfo({...pacienteInfo, treino_fisico:e.target.value})}
                        />
                    </Column>
                )}
            </Column>
            <VSpace />
            <Row>
              <RowItem noPadding>
                <CustomButton title="Finalizar" isSubmit type="primary" />
              </RowItem>
              <HSpace />
              <RowItem grow noPadding>
                <CustomButton title="Cancelar" onClick={onCancel}/>
              </RowItem>
            </Row>
        </form>
    );
}