import { GetHourMinute } from "../utils/date";
import { TipoConsulta } from "../utils/options";
import { AppointmentStatus } from "../utils/utils";
import { Row } from "./row";
import { CustomButton } from "./customButton";

export const AppointmentInfo = ({appointment, cancelAppointment, payAppointment}) => {
  return (
    <div style={{width: "100%", padding: "16px"}}>
      <h3>Dados da consulta</h3>
      <body>{TipoConsulta[appointment.profissional__ocupacao]}</body>
      <body>Profissional: {appointment.profissional__nome}</body>
      <body>Endereço: {appointment.profissional__logradouro}, {appointment.profissional__numero} - {appointment.profissional__complemento}</body>
      <body>Horário: {GetHourMinute(appointment.horario, appointment.duracao)}</body>
      <br/>
      <Row>
        {appointment.status == AppointmentStatus.pendente &&
          <CustomButton
            type="primary"
            title="Realizar pagamento"
            onClick={payAppointment}
          />
        }
        {appointment.status != AppointmentStatus.cancelada &&
          <CustomButton
            type="secondary"
            title="Cancelar"
            onClick={cancelAppointment}
          />
        }
      </Row>
    </div>
  );
};