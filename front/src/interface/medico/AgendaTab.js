import React from "react";
import {useState} from "react";
import {AgendaList} from "../../components/agendaList";
import {Row} from "../../components/row";
import {RowItem} from "../../components/rowItem";
import {VerticalLine} from "../../components/verticalLine";
import {GetAgenda} from "../../contoller/medico/AgendaController";
import {GetHourMinute} from "../../utils/date";
import {CustomButton} from "../../components/customButton";
import {CenterContent} from "../../components/centerContent";
import {FormContainer} from "../../components/formContainer";
import {PopUpContainer} from "../../components/popUpContainer";
import {AppointmentForm} from "./components/appointmentForm";
import {Column} from "../../components/column";
import {FinalizarConsulta} from "../../contoller/medico/ConsultaController";
import {GetPacienteExtraInfo} from "../../contoller/medico/ConsultaController";
import {TipoDiabetesNumberToString} from "../../utils/utils";
import {PedidoExameForm} from "./components/exameForm";


const CONSULTA_CHOICES = {
    "0": 'Agendada',
    "1": 'Cancelada',
    "2": 'Realizada',
    "3": 'Vencida',
    "4": 'Pendente'
}

const AgendaTab = () => {
    const [agenda] = GetAgenda("2021-01-01", "2024-12-31");
    const [selectedAppointment, setSelectedAppointment] = useState("");

    return (
        <>
            <Row>
                <RowItem grow noPadding>
                    <div style={{width: "100%"}}>
                        <h2>Suas consultas</h2>
                        {agenda && <AgendaList professionalType={1} appointments={agenda}
                                               selectedAppointment={selectedAppointment}
                                               onItemClick={(itemId) => setSelectedAppointment(itemId)}/>}
                    </div>
                </RowItem>
                <RowItem>
                    <VerticalLine noPadding/>
                </RowItem>
                <RowItem grow noPadding>
                    {selectedAppointment ? (
                        <AppointmentInfo appointment={selectedAppointment}/>
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

const AppointmentInfo = ({appointment}) => {
    const [showPopUpConsulta, setShowPopUpConsulta] = useState(false);
    const [showPopUpExame, setShowPopUpExame] = useState(false);

    const {extraInfo} = GetPacienteExtraInfo(appointment.id);
    const {finalizar} = FinalizarConsulta(appointment.id);

    const handleSubmitConsulta = () => {
        finalizar();
        setShowPopUpConsulta(false);
    }

    const handleSubmitExame = () => {
        setShowPopUpExame(false);
    }

    return (
        <div>
            <PopUpContainer showPopUp={showPopUpConsulta} closePopUp={() => setShowPopUpConsulta(false)}>
                <CenterContent>
                    <FormContainer>
                        <AppointmentForm
                            consultaId={appointment.id}
                            onSubmit={handleSubmitConsulta}
                            onCancel={() => setShowPopUpConsulta(false)}
                        />
                    </FormContainer>
                </CenterContent>
            </PopUpContainer>

            <PopUpContainer showPopUp={showPopUpExame} closePopUp={() => setShowPopUpExame(false)}>
                <CenterContent>
                    <FormContainer>
                        <PedidoExameForm
                            paciente_id={appointment.paciente__id}
                            onSubmit={handleSubmitExame}
                        />
                    </FormContainer>
                </CenterContent>
            </PopUpContainer>

            <Column>
                <h4>Dados Básicos</h4>
                <text>Paciente: {appointment.paciente__nome}</text>
                <text>Horário da consulta: {GetHourMinute(appointment.horario, appointment.duracao)}</text>
                <text>Status: {CONSULTA_CHOICES[appointment.status]}</text>
                <br></br>
                {extraInfo && (
                    <>
                        <h4>Informações médicas</h4>
                        <text>{extraInfo.medical?.alergias}</text>
                        <text>{TipoDiabetesNumberToString[extraInfo.medical?.tipo_diabetes]}</text>
                    </>
                )}

            </Column>
            <Row>
                <CustomButton title="Realizar consulta" onClick={() => setShowPopUpConsulta(true)} type="primary"/>
                <CustomButton title="Pedir Exame" onClick={() => setShowPopUpExame(true)} type="primary"/>
            </Row>
        </div>
    );
};
export default AgendaTab;
