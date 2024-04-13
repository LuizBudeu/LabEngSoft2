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
import {StatusBadge} from "../../components/statusBadge";
import {GetLastMedicalReport} from "../../contoller/medico/ConsultaController";
import {FormatDate} from "../../utils/date";


const CONSULTA_CHOICES = {
    "0": 'Agendada', "1": 'Cancelada', "2": 'Realizada', "3": 'Vencida', "4": 'Pendente'
}

const AgendaTab = () => {
    // const start_date = '2024-01-01';
    const start_date = new Date().toISOString().slice(0, 10);
    const [agenda] = GetAgenda(start_date, "2024-12-31");
    const [selectedAppointment, setSelectedAppointment] = useState("");

    return (<>
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
                {selectedAppointment ? (<AppointmentInfo appointment={selectedAppointment}/>) : (<CenterContent>
                    <span>Selecione uma consulta</span>
                </CenterContent>)}
            </RowItem>
        </Row>
    </>);
};

const AppointmentInfo = ({appointment}) => {
    const [showPopUpConsulta, setShowPopUpConsulta] = useState(false);
    const [showPopUpExame, setShowPopUpExame] = useState(false);

    const {extraInfo} = GetPacienteExtraInfo(appointment.id);
    const {lastReport} = GetLastMedicalReport(appointment.paciente__id);
    console.log(appointment.paciente__id);
    const {finalizar} = FinalizarConsulta(appointment.id);

    const showButtons = CONSULTA_CHOICES[appointment.status] === "Agendada";

    const handleSubmitConsulta = () => {
        finalizar();
        setShowPopUpConsulta(false);
    }

    const handleSubmitExame = () => {
        setShowPopUpExame(false);
    }

    return (<div style={{width: "100%", padding: "16px"}}>
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
            <Row>
                <RowItem grow noPadding>
                    <h3>Dados Básicos</h3>
                </RowItem>
                <RowItem grow center>
                    <StatusBadge status={appointment.status}/>
                </RowItem>
            </Row>
            <text>Paciente: {appointment.paciente__nome}</text>
            <text>Horário da consulta: {GetHourMinute(appointment.horario, appointment.duracao)}</text>
            <text>Status: {CONSULTA_CHOICES[appointment.status]}</text>
            <br></br>
            {extraInfo && (<>
                <h3>Informações médicas:</h3>
                <text><b>Alergias: </b>{extraInfo?.medical?.alergias}</text>
                <text><b>Diabetes: </b>{TipoDiabetesNumberToString[extraInfo?.medical?.tipo_diabetes]}</text>
            </>)}
            <br></br>
            {lastReport && (<>
                <h3>Último relatório do paciente ({FormatDate(lastReport.created_at)}):</h3>
                {lastReport.massa ? <text><b>Massa: </b>{lastReport.massa}</text> : ''}
                {lastReport.altura ? <text><b>Altura: </b>{lastReport.altura}</text> : ''}
                {lastReport.nivel_de_acucar_no_sangue ?
                    <text><b>Nível de açúcar no sangue: </b>{lastReport.nivel_de_acucar_no_sangue}</text> : ''}
                {lastReport.gordura_no_figado ?
                    <text><b>Gordura no fígado: </b>{lastReport.gordura_no_figado}</text> : ''}
                {lastReport.hemoglobina_glicada ?
                    <text><b>Hemoglobina glicada: </b>{lastReport.hemoglobina_glicada}</text> : ''}
                {lastReport.producao_de_insulina ?
                    <text><b>Produção de insulina: </b>{lastReport.producao_de_insulina}</text> : ''}
            </>)}
        </Column>
        <br></br>
        <Row>
            {showButtons && (<>
                <CustomButton title="Realizar consulta" onClick={() => setShowPopUpConsulta(true)}
                              type="primary"/>
                <CustomButton title="Pedir Exame" onClick={() => setShowPopUpExame(true)} type="primary"/>
            </>)}
        </Row>
    </div>);
};
export default AgendaTab;
