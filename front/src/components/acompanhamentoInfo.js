import { TipoAcompanhamento } from "../utils/options";
import { Row } from "./row";
import { RowItem } from "./rowItem";
import { CustomButton } from "./customButton";

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
          <body>Duração: {acompanhamento.dieta__duracao_em_dias} dias</body>
          <body>Calorias: {acompanhamento.dieta__calorias} kcal</body>
          <br/>
          <body>{acompanhamento.dieta__descricao}</body>
        </div>
      ) : (
        type == "treino" ? (
          <div>
            <h4>{acompanhamento.treino_fisico__title}</h4>
            <body>{acompanhamento.treino_fisico__treino}</body>
          </div>
        ) : (
          <div>
            {type == "exameMedico" ? (
              <div>
                <body>{acompanhamento.titulo}</body>
              </div>
            ) : (
              <body>{acompanhamento.tipo_exame}</body>
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