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
import { GetPacienteExtraInfo } from "../../contoller/preparador/ConsultaController";
import { TipoDiabetesNumberToString } from "../../utils/utils";
import { ScrollContainer } from "../../components/scrollContainer";

export const AgendaTab = () => {
    const { agenda } = GetAgenda("2024-04-10", "2024-12-30");

    const [selectedAppointment, setSelectedAppointment] = useState("");
    
    return(
        <>
            <Row>
                <RowItem grow noPadding>
                    <ScrollContainer>
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
                    </ScrollContainer>
                </RowItem>
                <RowItem noPadding>
                    <VerticalLine noPadding />
                </RowItem>
                <RowItem grow>
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
    const { extraInfo } = GetPacienteExtraInfo(appointment.id);
    const { finalizar } = FinalizarConsulta(appointment.id);

    const handleSubmit = () => {
        finalizar();
        setShowPopUp(false);
    }

    return (
        <div>
            <PopUpContainer showPopUp={showPopUp} closePopUp={() => setShowPopUp(false)}>
                <CenterContent>
                    <FormContainer>
                        <AppointmentForm 
                            consultaId={appointment.id}
                            onSubmit={handleSubmit}
                            onCancel={() => setShowPopUp(false)}
                        />
                    </FormContainer>
                </CenterContent>
            </PopUpContainer>
            <Column>
                <h2>Dados Básicos</h2>
                <text>Paciente: {appointment.paciente__nome}</text>
                <text>Horário da consulta: {GetHourMinute(appointment.horario, appointment.duracao)}</text>
                <br></br>
                {extraInfo && (
                    <>
                        <h3>Informações médicas</h3>
                        <p><b>Alergias: </b>{extraInfo.medical?.alergias}</p>
                        <p><b>Diabetes: </b>{TipoDiabetesNumberToString[extraInfo.medical?.tipo_diabetes]}</p>
                        <h3>Informações nutricionais</h3>
                        <p><b>Descrição curta:</b> {extraInfo.nutrition?.dieta__descricao_curta}</p>
                        <p><b>Descrição:</b> {extraInfo.nutrition?.dieta__descricao}</p>
                        <p><b>Calorias:</b> {extraInfo.nutrition?.dieta__calorias}</p>
                        <p><b>Detalhes adicionas:</b> {extraInfo.nutrition?.detalhes_adicionais}</p>
                    </>
                )}
            </Column>
            <Row>
                <CustomButton title="Realizar consulta" onClick={() => setShowPopUp(true)} type="primary" />
            </Row>
        </div>
    );
}