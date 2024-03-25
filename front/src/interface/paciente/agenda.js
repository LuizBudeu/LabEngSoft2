// Import the react JS packages
import axios from "axios";
import { useState } from "react"; // Define the Login function.
import { GetAppointments } from "../../contoller/paciente/AgendaController"; 
import { useNavigate } from 'react-router-dom';
import { VerticalLine } from "../../components/verticalLine";
import { AppointmentItem } from "../../components/appointmentItem";
import { AppointmentInfo } from "../../components/appointmentInfo";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { CustomButton } from "../../components/customButton";
import { CenterContent } from "../../components/centerContent";
import { PopUpContainer } from "../../components/popUpContainer";
import { MainContainer } from "../../components/mainContainer";
import { ScrollContainer } from "../../components/scrollContainer";
import { GetHourMinute, FormatDate } from "../../utils/date";
import { NovaConsulta } from "./novaConsulta";

const Agenda = () => {
  const navigate = useNavigate();
  const [
    appointmentsByDay, 
    refreshAppointments,
    selectedAppointment, 
    setSelectedAppointment,
    showPopUp, 
    setShowPopUp,
    cancelAppointment,
    payAppointment
  ] = GetAppointments("1");

  return (
    <div>
      <PopUpContainer showPopUp={showPopUp} closePopUp={() => setShowPopUp(false)}>
        <MainContainer>
          <NovaConsulta onSuccess={() => {
              setShowPopUp(false);
              refreshAppointments();
            }}/>
        </MainContainer>
      </PopUpContainer>
      <Row>
        <RowItem grow noPadding>
          <ScrollContainer>
            <div>
              <h3 className="Auth-form-title">Suas consultas</h3>
              <CustomButton
                type="primary"
                title="Nova consulta"
                onClick={() => setShowPopUp(true)}
              />
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
          </ScrollContainer>
        </RowItem>
        <RowItem noPadding>
          <VerticalLine/>
        </RowItem>
        <RowItem grow noPadding>
          {selectedAppointment ? (
            <AppointmentInfo 
              appointment={selectedAppointment} 
              cancelAppointment={() => {
                cancelAppointment(selectedAppointment.id)
              }}
              payAppointment={() => {
                payAppointment(selectedAppointment.id)
              }}
            />
          ) : (
            <CenterContent>
              <text>Selecione uma consulta</text>
            </CenterContent>
          )}
        </RowItem>
      </Row>      
    </div>
  );
};

export default Agenda;