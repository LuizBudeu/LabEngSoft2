import { GetHourMinute } from "../utils/date";
import { TipoConsulta } from "../utils/options";
import { AppointmentStatus } from "../utils/utils";
import { Row } from "./row";
import { CustomButton } from "./customButton";
import { StatusBadge } from "./statusBadge";
import { RowItem } from "./rowItem";

export const AppointmentInfo = ({appointment, cancelAppointment, payAppointment}) => {
  return (
    <div style={{width: "100%", padding: "16px"}}>
      <Row>
        <RowItem grow noPadding>
          <h3>{TipoConsulta[appointment.profissional__ocupacao]}</h3>
        </RowItem>
        <RowItem grow noPadding center>
          <StatusBadge status={appointment.status}/>
        </RowItem>
      </Row>
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