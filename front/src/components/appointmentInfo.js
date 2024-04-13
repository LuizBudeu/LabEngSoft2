import { GetHourMinute } from "../utils/date";
import { TipoConsulta } from "../utils/options";
import { AppointmentStatus } from "../utils/utils";
import { Row } from "./row";
import { CustomButton } from "./customButton";
import { StatusBadge } from "./statusBadge";
import { RowItem } from "./rowItem";
import { Column } from "./column";

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
      <Column>
        <text>Profissional: {appointment.profissional__nome}</text>
        <text>Endereço: {appointment.profissional__logradouro}, {appointment.profissional__numero} - {appointment.profissional__complemento}</text>
        <text>Horário: {GetHourMinute(appointment.horario, appointment.duracao)}</text>
      </Column>
      <br/>
      <Row>
        {appointment.status == AppointmentStatus.pendente &&
          <RowItem grow center noPadding>
            <CustomButton
              type="primary"
              title="Realizar pagamento"
              onClick={payAppointment}
            />
          </RowItem>
        }
        {appointment.status != AppointmentStatus.cancelada && appointment.status != AppointmentStatus.realizada &&
          <RowItem grow center noPadding>
            <CustomButton
              type="cancel"
              title="Cancelar"
              onClick={cancelAppointment}
            />
          </RowItem>
        }
      </Row>
    </div>
  );
};