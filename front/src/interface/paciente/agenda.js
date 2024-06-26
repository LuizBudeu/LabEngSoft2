// Import the react JS packages
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
import { formatCurrency } from "../../utils/utils";
import { NovaConsulta } from "./novaConsulta";
import { DynamicContainer } from "../../components/dynamicContainer";
import { CustomInput } from "../../components/customInput";
import { Column } from "../../components/column";

const Agenda = () => {
  const navigate = useNavigate();
  const [
    appointmentsByDay, 
    refreshAppointments,
    selectedAppointment, 
    setSelectedAppointment,
    showNewAppointmentPopUp, 
    setShowNewAppointmentPopUp,
    showPayAppointmentPopUp, 
    setPayNewAppointmentPopUp,
    cancelAppointment,
    payAppointment,
    cardNumber, 
    setCardNumber
  ] = GetAppointments();

  const submit = async (e) => {
    e.preventDefault();
    payAppointment(selectedAppointment.id, selectedAppointment.profissional__ocupacao);
    setPayNewAppointmentPopUp(false);
  }

  return (
    <div style={{height: "100%"}}>
      <PopUpContainer showPopUp={showNewAppointmentPopUp} closePopUp={() => setShowNewAppointmentPopUp(false)}>
        <MainContainer>
          <NovaConsulta onSuccess={() => {
              setShowNewAppointmentPopUp(false);
              refreshAppointments();
            }}/>
        </MainContainer>
      </PopUpContainer>
      <PopUpContainer showPopUp={showPayAppointmentPopUp} closePopUp={() => setPayNewAppointmentPopUp(false)} center>
        <DynamicContainer>
          <form onSubmit={submit}>
            <Column>
              <text style={{'font-weight': 'bold'}}>Pagar consuta</text>
              <text>Valor a ser pago: {formatCurrency(selectedAppointment?.valor+selectedAppointment?.tarifa)}</text>
              <br/>
              <text style={{fontWeight: "bold"}}>Número do cartão</text>
              <Row>
                <CustomInput
                  name="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  type="text"
                />
              </Row>
              <Row>
                <RowItem grow center>
                  <CustomButton
                    type="primary"
                    title="Pagar consulta"
                    isSubmit
                  />
                </RowItem>
              </Row>
            </Column>
          </form>          
        </DynamicContainer>
      
      </PopUpContainer>
      <div style={{height: "100%"}}>
        <Row>
          <RowItem grow noPadding>
            <ScrollContainer>
              <div>
                <h3 className="Auth-form-title">Suas consultas</h3>
                <CustomButton
                  type="primary"
                  title="Nova consulta"
                  onClick={() => setShowNewAppointmentPopUp(true)}
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
                  setPayNewAppointmentPopUp(true)
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
        
           
    </div>
  );
};

export default Agenda;