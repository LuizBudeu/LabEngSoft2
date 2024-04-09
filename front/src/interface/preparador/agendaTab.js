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
import { useAxiosWithToken } from "../../utils/useAxiosWithToken";

export const AgendaTab = () => {
    const { agenda } = GetAgenda("2024-03-20", "2024-12-30");

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
    const { extraInfo } = GetPacienteExtraInfo(appointment.id);
    const [axios] = useAxiosWithToken();
    
    const handleSubmit = () => {
        FinalizarConsulta(appointment.id, axios);
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
                <h4>Dados Básicos</h4>
                <text>Paciente: {appointment.paciente__nome}</text>
                <text>Horário da consulta: {GetHourMinute(appointment.horario, appointment.duracao)}</text>
                <br></br>
                {extraInfo && (
                    <>
                        <h4>Informações médicas</h4>
                        <text>{extraInfo.medical?.alergias}</text>
                        <text>{TipoDiabetesNumberToString[extraInfo.medical?.tipo_diabetes]}</text>
                        <h4>Informações nutricionais</h4>
                        <text>{extraInfo.nutrition?.dieta}</text>
                        <text>{extraInfo.nutrition?.detalhes_adicionais}</text>
                    </>
                )}
            </Column>
            <Row>
                <CustomButton title="Realizar consulta" onClick={() => setShowPopUp(true)} type="primary" />
            </Row>
        </div>
    );
}