import React from "react";
import { useState } from "react";
import { AgendaList } from "../../components/agendaList";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { VerticalLine } from "../../components/verticalLine";
import { GetAgenda } from "../../contoller/preparador/AgendaController";
import { GetHourMinute } from "../../utils/date";
import { CustomButton } from "../../components/customButton";
import { CenterContent } from "../../components/centerContent";
import { FormContainer } from "../../components/formContainer";
import { PopUpContainer } from "../../components/popUpContainer";
import { AppointmentForm } from "./components/appointmentForm";
import { Column } from "../../components/column";
import { FinalizarConsulta } from "../../contoller/preparador/ConsultaController";


export const AgendaTab = () => {
    const { agenda } = GetAgenda("3", "2024-03-20", "2024-06-24");

    const [selectedAppointment, setSelectedAppointment] = useState("");
    
    return(
        <>
            <Row>
                <RowItem grow noPadding>
                    <div style={{width: "100%"}}>
                        <h2>Suas consultas</h2>
                        {agenda &&
                            <AgendaList
                                appointments={agenda}
                                selectedAppointment={selectedAppointment}
                                onItemClick={(itemId) => setSelectedAppointment(itemId)}
                            />
                        }
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
                        )
                    }
                </RowItem>
            </Row>
        </>
    );
};

const AppointmentInfo = ({appointment, onFormClick}) => {
    const [showPopUp, setShowPopUp] = useState(false);

    const handleSubmit = () => {
        FinalizarConsulta(appointment.id);
        setShowPopUp(false);
    }

    return (
        <div>
            <PopUpContainer showPopUp={showPopUp} closePopUp={() => setShowPopUp(false)}>
                <CenterContent>
                    <FormContainer>
                        <AppointmentForm consulta_id={appointment.id} onSubmit={handleSubmit} onClose={() => setShowPopUp(false)}/>
                    </FormContainer>
                </CenterContent>
            </PopUpContainer>
            <Column>
                <text>Paciente: {appointment.paciente__nome}</text>
                <text>Horário da consulta: {GetHourMinute(appointment.horario, appointment.duracao)}</text>
            </Column>
            <Row>
                <CustomButton title="Realizar consulta" onClick={() => setShowPopUp(true)} type="primary" />
            </Row>
        </div>
    );
}