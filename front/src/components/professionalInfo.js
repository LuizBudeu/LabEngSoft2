import { GetHourMinute } from "../utils/date";
import { TipoConsulta } from "../utils/options";
import { AppointmentStatus } from "../utils/utils";
import { Row } from "./row";
import { CustomButton } from "./customButton";
import { CenterContent } from "./centerContent";
import { Column } from "./column";
import { ScheduleGrid } from "../interface/paciente/scheduleGrid";

export const ProfessionalInfo = ({professional, horarios, requestAppointment}) => {
  return (
    <div style={{padding: "16px"}}>
      <h3>Dados do profissional</h3>
      <Column>
        <text>Nome: {professional.nome}</text>
        <text>Endereço: {professional.logradouro}, {professional.numero} - {professional.complemento}</text>
      </Column>
      <br/>
      {horarios ? (
        <ScheduleGrid 
          horarios={horarios} 
          requestAppointment={requestAppointment}
          professional={professional}
        />
      ) : (
        <CenterContent>
          <text>Não foi possível carregar os horários</text>
        </CenterContent>
      )}
    </div>
  );
};