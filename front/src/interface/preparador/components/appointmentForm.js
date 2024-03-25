import React, { useState } from "react";
import { Column } from "../../../components/column";
import { CustomButton } from "../../../components/customButton";
import { CustomInput } from "../../../components/customInput";
import { CustomSelect } from "../../../components/customSelect";
import { NivelAtividade } from "../../../utils/options";
import { GetWorkOuts } from "../../../contoller/preparador/WorkOutController";

// consulta = models.ForeignKey(Consulta, on_delete=models.CASCADE)

export const AppointmentForm = ({consulta_id, onSubmit, onClose}) => {
    const [pacienteInfo, setPacientInfo] = useState({nivel_de_atividade_fisica: 0, treino_fisico: 0});
    const [workOuts] = GetWorkOuts("3");

    const submit = (e) => {
        e.preventDefault();
        onSubmit();
    }
    
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
                <Column>
                  <body>Altura</body>
                  <CustomInput
                    name="altura"
                    onChange={(e) => setPacientInfo({...pacienteInfo, altura:e.target.value})}
                    value={pacienteInfo.altura}
                    type="text"
                    required
                  />
                </Column>

                <Column>
                  <body>Peso</body>
                  <CustomInput
                    name="massa"
                    onChange={(e) => setPacientInfo({...pacienteInfo, massa:e.target.value})}
                    value={pacienteInfo.massa}
                    type="text"
                    required
                  />
                </Column>

                <Column>
                    <body>Nível de atividade física</body>
                    <CustomSelect
                        list={NivelAtividade}
                        value={pacienteInfo.nivel_de_atividade_fisica}
                        onChange={(e) => setPacientInfo({...pacienteInfo, nivel_de_atividade_fisica:e.target.value})}
                    />
                </Column>

                <Column>
                  <body>Percentual de gordura</body>
                  <CustomInput
                    name="porcentagem_de_gordura"
                    onChange={(e) => setPacientInfo({...pacienteInfo, porcentagem_de_gordura:e.target.value})}
                    value={pacienteInfo.porcentagem_de_gordura}
                    type="text"
                    required
                  />
                </Column>

                <Column>
                  <body>Percentual de massa magra</body>
                  <CustomInput
                    name="porcentage_de_musculo"
                    onChange={(e) => setPacientInfo({...pacienteInfo, porcentage_de_musculo:e.target.value})}
                    value={pacienteInfo.porcentage_de_musculo}
                    type="text"
                    required
                  />
                </Column>

                <Column>
                  <body>Metabolismo basal</body>
                  <CustomInput
                    name="metabolismo_basal"
                    onChange={(e) => setPacientInfo({...pacienteInfo, metabolismo_basal:e.target.value})}
                    value={pacienteInfo.metabolismo_basal}
                    type="text"
                    required
                  />
                </Column>

                <Column>
                  <body>Gasto calórico</body>
                  <CustomInput
                    name="gasto_calorico"
                    onChange={(e) => setPacientInfo({...pacienteInfo, gasto_calorico:e.target.value})}
                    value={pacienteInfo.gasto_calorico}
                    type="text"
                    required
                  />
                </Column>

                {workOuts && (
                    <Column>
                        <body>Treino</body>
                        <CustomSelect
                            list={workOutsToSelector(workOuts)}
                            value={pacienteInfo.treino_fisico}
                            onChange={(e) => setPacientInfo({...pacienteInfo, treino_fisico:e.target.value})}
                            />
                    </Column>
                )}
            </Column>
            <CustomButton title="Finalizar" isSubmit type="primary" />
            <CustomButton title="Cancelar" onClick={onClose}/>
        </form>
    );
}