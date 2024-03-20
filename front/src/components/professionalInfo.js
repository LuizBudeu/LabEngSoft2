import { GetHourMinute } from "../utils/date";
import { TipoConsulta } from "../utils/options";
import { AppointmentStatus } from "../utils/utils";
import { Row } from "./row";
import { CustomButton } from "./customButton";
import { CenterContent } from "./centerContent";
import { ScheduleGrid } from "../interface/paciente/scheduleGrid";

export const ProfessionalInfo = ({professional, horarios, requestAppointment}) => {
  return (
    <div style={{width: "100%", padding: "16px"}}>
      <h3>Dados do profissional</h3>
      <body>Nome: {professional.nome}</body>
      <body>Endereço: {professional.logradouro}, {professional.numero} - {professional.complemento}</body>
      <br/>
      {horarios ? (
        <ScheduleGrid 
          horarios={horarios} 
          requestAppointment={requestAppointment}
          professional={professional}
        />
      ) : (
        <CenterContent>
          <body>Não foi possível carregar os horários</body>
        </CenterContent>
      )}
    </div>
  );
};