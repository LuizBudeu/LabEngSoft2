// import React from "react";
// import "./styles/Tabs.css";
// import { AgendaList } from "../../components/agendaList";

// import { useState } from "react";
// import { Row } from "../../components/row";
// import { RowItem } from "../../components/rowItem";
// import { VerticalLine } from "../../components/verticalLine";
// import { GetHourMinute } from "../../utils/date";
// import { CustomButton } from "../../components/customButton";
// import { CenterContent } from "../../components/centerContent";

import React from "react";
import { useState } from "react";
import { AgendaList } from "../../components/agendaList";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { VerticalLine } from "../../components/verticalLine";
import { GetAgenda } from "../../contoller/medico/AgendaController";
import { GetHourMinute } from "../../utils/date";
import { CustomButton } from "../../components/customButton";
import { CenterContent } from "../../components/centerContent";
import { FormContainer } from "../../components/formContainer";
import { PopUpContainer } from "../../components/popUpContainer";
// import { AppointmentForm } from "./components/appointmentForm";
import { Column } from "../../components/column";
// import { FinalizarConsulta } from "../../contoller/preparador/ConsultaController";
// import { GetPacienteExtraInfo } from "../../contoller/preparador/ConsultaController";
import { useAxiosWithToken } from "../../utils/useAxiosWithToken";

const AgendaTab = () => {
    const [agenda] = GetAgenda("2", "2021-01-01", "2024-12-31");
    const [selectedAppointment, setSelectedAppointment] = useState("");

    return (
        <>
            <Row>
                <RowItem grow noPadding>
                    <div style={{ width: "100%" }}>
                        <h2>Suas consultas</h2>
                        {agenda && <AgendaList appointments={agenda} selectedAppointment={selectedAppointment} onItemClick={(itemId) => setSelectedAppointment(itemId)} />}
                    </div>
                </RowItem>
                <RowItem>
                    <VerticalLine noPadding />
                </RowItem>
                <RowItem grow noPadding>
                    {selectedAppointment ? (
                        <AppointmentInfo appointment={selectedAppointment} />
                    ) : (
                        <CenterContent>
                            <span>Selecione uma consulta</span>
                        </CenterContent>
                    )}
                </RowItem>
            </Row>
        </>
    );
};

const AppointmentInfo = ({ appointment }) => {
    const [showPopUp, setShowPopUp] = useState(false);
    // const { extraInfo } = GetPacienteExtraInfo(appointment.id);
    const axios = useAxiosWithToken();
    
    // const handleSubmit = () => {
    //     FinalizarConsulta(appointment.id, axios);
    //     setShowPopUp(false);
    // }

    return (
        <div>
            <PopUpContainer showPopUp={showPopUp} closePopUp={() => setShowPopUp(false)}>
                <CenterContent>
                    <FormContainer>
                        {/* <AppointmentForm 
                            consultaId={appointment.id}
                            onSubmit={handleSubmit}
                            onCancel={() => setShowPopUp(false)}
                        /> */}
                    </FormContainer>
                </CenterContent>
            </PopUpContainer>
            <Column>
                <h4>Dados Básicos</h4>
                <text>Paciente: {appointment.paciente__nome}</text>
                <text>Horário da consulta: {GetHourMinute(appointment.horario, appointment.duracao)}</text>
                <br></br>
                
            </Column>
            <Row>
                <CustomButton title="Realizar consulta" onClick={() => setShowPopUp(true)} type="primary" />
            </Row>
        </div>
    );
};
export default AgendaTab;
