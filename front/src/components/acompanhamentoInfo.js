import { TipoAcompanhamento } from "../utils/options";
import { Row } from "./row";
import { RowItem } from "./rowItem";
import { CustomButton } from "./customButton";
import { Column } from "./column";

export const AcompanhamentoInfo = ({acompanhamento, type, scheduleAppointment}) => {

  let nome_profissional = "";
  switch (type) {
    case 'dieta':
    case 'treino':
      nome_profissional = acompanhamento.consulta__profissional__nome
      break;
    case 'exameMedico':
      nome_profissional = acompanhamento.medico__nome
      break;
    default:
      nome_profissional = acompanhamento.Nutricionista__nome
  }

  return (
    <div style={{width: "100%", padding: "16px"}}>
      <h3>{TipoAcompanhamento[type]} por {nome_profissional}</h3>
      {type == "dieta" ? (
        <div>
          <h4>{acompanhamento.dieta__descricao_curta}</h4>
          <Column>
            <text>Duração: {acompanhamento.dieta__duracao_em_dias} dias</text>
            <text>Calorias: {acompanhamento.dieta__calorias} kcal</text>
            <br/>
            <text>{acompanhamento.dieta__descricao}</text>
          </Column>
        </div>
      ) : (
        type == "treino" ? (
          <div>
            <h4>{acompanhamento.treino_fisico__title}</h4>
            <text>{acompanhamento.treino_fisico__treino}</text>
          </div>
        ) : (
          <div>
            {type == "exameMedico" ? (
              <div>
                <text>{acompanhamento.titulo}</text>
              </div>
            ) : (
              <text>{acompanhamento.tipo_exame}</text>
            )}
            <Row>
              <RowItem grow center>
                <CustomButton
                  type="primary"
                  title="Agendar nova consulta"
                  onClick={scheduleAppointment}
                />
              </RowItem>
            </Row>
          </div>
        )
      )}
    </div>
  );
};