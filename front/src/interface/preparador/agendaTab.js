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
import { AppointmentStatus, TipoDiabetesNumberToString } from "../../utils/utils";
import { ScrollContainer } from "../../components/scrollContainer";

export const AgendaTab = () => {
    const { agenda, refetch } = GetAgenda();
    const [selectedAppointment, setSelectedAppointment] = useState("");
    const { finalizar } = FinalizarConsulta();
    const [showPopUp, setShowPopUp] = useState(false);
    
    const handleSubmit = () => {
        finalizar({
            consulta_id: selectedAppointment.id,
            onSuccess: () => {
                refetch();
                setSelectedAppointment({...selectedAppointment, status:2});
                setShowPopUp(false);
            },
            onError: (error) => console.log(error)
        });
    }

    
    return(
        <>
            <PopUpContainer showPopUp={showPopUp} closePopUp={() => setShowPopUp(false)}>
                <CenterContent>
                    <FormContainer>
                        <AppointmentForm 
                            consultaId={selectedAppointment.id}
                            onSubmit={handleSubmit}
                            onCancel={() => setShowPopUp(false)}
                        />
                    </FormContainer>
                </CenterContent>
            </PopUpContainer>
            <Row>
                <RowItem grow noPadding>
                    <ScrollContainer>
                        <div style={{width: "100%"}}>
                            <h2>Suas consultas</h2>
                            {agenda &&
                                <AgendaList
                                    professionalType={3}
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
                            <AppointmentInfo appointment={selectedAppointment} onStartClick={() => setShowPopUp(true)} />
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

const AppointmentInfo = ({appointment, onStartClick}) => {
    const [ extraInfo ] = GetPacienteExtraInfo(appointment.id);

    return (
        <div>
            <Column>
                <h2>Dados Básicos</h2>
                <text>Paciente: {appointment.paciente__nome}</text>
                <text>Horário da consulta: {GetHourMinute(appointment.horario, appointment.duracao)}</text>
                <h3>Informações médicas</h3>
                { extraInfo?.medical ? (
                    <>
                        <p><b>Alergias: </b>{extraInfo?.medical?.alergias}</p>
                        <p><b>Diabetes: </b>{TipoDiabetesNumberToString[extraInfo?.medical?.tipo_diabetes]}</p>
                    </>
                ) : (
                    <>
                        <p>O paciente ainda não possui informações cadastradas</p>
                    </>
                )}
                <h3>Informações nutricionais</h3>
                { extraInfo?.nutrition ? (
                    <>
                        <p><b>Descrição curta:</b> {extraInfo?.nutrition?.dieta__descricao_curta}</p>
                        <p><b>Descrição:</b> {extraInfo?.nutrition?.dieta__descricao}</p>
                        <p><b>Calorias:</b> {extraInfo?.nutrition?.dieta__calorias}</p>
                        <p><b>Detalhes adicionas:</b> {extraInfo?.nutrition?.detalhes_adicionais}</p>
                    </>
                ) : (
                    <>
                        <p>O paciente ainda não possui informações cadastradas</p>
                    </>
                )}
            </Column>
            <Row>
                <CustomButton
                    title="Realizar consulta"
                    onClick={onStartClick}
                    type="primary"
                    disabled={appointment.status !== AppointmentStatus.agendada}
                />
            </Row>
        </div>
    );
}