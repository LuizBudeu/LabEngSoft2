// Import the react JS packages
import axios from "axios";
import { useState } from "react"; // Define the Login function.
import { GetAppointments } from "../../contoller/paciente/AgendaController"; 
import { useNavigate } from 'react-router-dom';
import { CustomButton } from "../../components/customButton";
import { VerticalLine } from "../../components/verticalLine";
import { AppointmentItem } from "../../components/appointmentItem";
import { GetHourMinute, FormatDate } from "../../utils/utils";
import { TipoConsulta } from "../../utils/options";

export const Agenda = () => {
  const navigate = useNavigate();
  const [appointmentsByDay] = GetAppointments("1");
  const [selectedAppointment, setSelectedAppointment] = useState();

  return (
    <div className="Auth-form-container">
        <div className="Auth-form-content">
          <table style={{width: '100%'}}>
          <tr>
            <td style={{width: '50%'}}>
              <h3 className="Auth-form-title">Suas consultas</h3>
              {appointmentsByDay && <div>
                {Object.entries(appointmentsByDay).map(([key, appointments]) => (
                  <div>
                    <h4>{FormatDate(key)}</h4>
                    {appointments.map((value) => (
                      <AppointmentItem
                        type={value.profissional__ocupacao}
                        text={value.profissional__nome + " - " + GetHourMinute(value.horario)}
                        status={value.status}
                        onClick={() => setSelectedAppointment(value)}
                        selected={value.id == selectedAppointment?.id}
                      />
                    ))}
                  </div>
                ))}
              </div>}
            </td>
            <td style={{height: '1px'}}>
              <VerticalLine/>
            </td>
            <td style={{width: '50%'}}>
              {selectedAppointment ? (
                <div>
                  <h3 className="Auth-form-title">Dados da consulta</h3>
                  <body className="Auth-form-title">{TipoConsulta[selectedAppointment.profissional__ocupacao]}</body>
                  <body className="Auth-form-title">Profissional: {selectedAppointment.profissional__nome}</body>
                  <body className="Auth-form-title">Endereço: {selectedAppointment.profissional__logradouro}, {selectedAppointment.profissional__numero} - {selectedAppointment.profissional__complemento}</body>
                  <body className="Auth-form-title">Horário: {GetHourMinute(selectedAppointment.horario)}</body>
                </div>
              ) : (
                <body className="Auth-form-title">Selecione uma consulta</body>
              )}
            </td>
          </tr>
          </table>
        </div>
    </div>
  );
};
