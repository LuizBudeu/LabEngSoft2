// Import the react JS packages
import axios from "axios";
import { useState } from "react"; // Define the Login function.
import { GetAppointments } from "../../contoller/nutricionista/AgendaController"; 
import { useNavigate } from 'react-router-dom';
import { VerticalLine } from "../../components/verticalLine";
import { AppointmentItem } from "../../components/appointmentItem";
import { AppointmentInfo } from "../../components/appointmentInfo";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { CustomButton } from "../../components/customButton";
import { CenterContent } from "../../components/centerContent";
import { GetHourMinute, FormatDate } from "../../utils/date";

const AgendaTab = () => {
  const navigate = useNavigate();
  const [appointmentsByDay] = GetAppointments("1", "2024-01-01", "3024-01-01");
  const [selectedAppointment, setSelectedAppointment] = useState();

  return (
    <Row>
      <RowItem grow noPadding>
        <div style={{width: "100%"}}>
          <h3 className="Auth-form-title">Suas consultas</h3>
          {appointmentsByDay && <div>
            {Object.entries(appointmentsByDay).map(([key, appointments]) => (
              <div>
                <h4>{FormatDate(key)}</h4>
                {appointments.map((value) => (
                  <AppointmentItem
                    type={value.profissional__ocupacao}
                    text={GetHourMinute(value.horario, value.duracao) + " - " + value.profissional__nome}
                    status={value.status}
                    onClick={() => setSelectedAppointment(value)}
                    selected={value.id == selectedAppointment?.id}
                  />
                ))}
              </div>
            ))}
          </div>}
        </div>
      </RowItem>
      <RowItem noPadding>
        <VerticalLine/>
      </RowItem>
      <RowItem grow noPadding>
        {selectedAppointment ? (
          <AppointmentInfo appointment={selectedAppointment}/>
        ) : (
          <CenterContent>
            <body>Selecione uma consulta</body>
          </CenterContent>
        )}
      </RowItem>
    </Row>
  );
};
export default AgendaTab;