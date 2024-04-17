import React from "react";
import { useState } from "react";
import { AgendaList } from "../../components/agendaList";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { VerticalLine } from "../../components/verticalLine";
import { GetConsultas, GetProfile } from "../../contoller/nutricionista/AgendaController";
import { SalvaRelatorio } from "../../contoller/nutricionista/RelatorioController";
import { GetHourMinute } from "../../utils/date";
import { CustomButton } from "../../components/customButton";
import { CenterContent } from "../../components/centerContent";
import { PopUpContainer } from "../../components/popUpContainer";
import { MainContainer } from "../../components/mainContainer";
import { ConsultaForm } from "./RelatorioForm";
import { ScrollContainer } from "../../components/scrollContainer";

export const AgendaTab = () => {
    const [agenda] = GetConsultas("2024-01-01", "3024-01-01");

    const [selectedAppointment, setSelectedAppointment] = useState("");
    
    return(
        <div style={{height: "100%"}}>

            <Row>
                <RowItem grow noPadding>
                    <ScrollContainer>
                        <div style={{width: "100%"}}>
                            <h2>Suas consultas</h2>
                            {agenda &&
                                <AgendaList
                                    professionalType={2}
                                    appointments={agenda}
                                    selectedAppointment={selectedAppointment}
                                    onItemClick={(itemId) => setSelectedAppointment(itemId)}
                                />
                            }
                        </div>
                    </ScrollContainer>
                </RowItem>
                <RowItem noPadding>
                    <VerticalLine />
                </RowItem>
                <RowItem grow noPadding>
                    {selectedAppointment ? (
                            <ConsultaInfo consulta={selectedAppointment} />
                        ) : (
                            <CenterContent>
                                <span>Selecione uma consulta</span>
                            </CenterContent>
                        )
                    }
                </RowItem>
            </Row>
        </div>
    );
};

const ConsultaInfo = ({consulta}) => {
    const test_id = 4 // TODO trocar por id do usuário logado na integração
    const [userProfile, setUserProfile] = GetProfile(test_id);
    const [relatorio, setRelatorio] = useState({})
    const [realizada, setRealizada] = useState(false)
    const [avaliada, setAvaliada] = useState(false)
    const [dietado, setDietado] = useState(false)

    const [showRelatorioPopUp, setShowRelatorioPopUp] = useState(false);
    const [showAvaliacaoPopUp, setShowAvaliacaoPopUp] = useState(false);
    const [showDietaPopUp, setShowDietaPopUp] = useState(false);

    const lidarComSubmitRelatorio = (event) => {
        event.preventDefault();
        setShowRelatorioPopUp(false);
        setRealizada(true);
    }

    const lidarComSubmitAvaliacao = (event) => {
        event.preventDefault();
        setShowAvaliacaoPopUp(false);
        setAvaliada(true);
    }

    return (
        <div>
            <PopUpContainer showPopUp={showRelatorioPopUp} closePopUp={() => setShowRelatorioPopUp(false)}>
                <MainContainer>
                    <ConsultaForm closePopUp={() => setShowRelatorioPopUp(false)} relatorio={relatorio} setRelatorio={setRelatorio} onSubmit={lidarComSubmitRelatorio}/>
                </MainContainer>
            </PopUpContainer>

            <div style={{flexGrow: 1, width: "100%", padding: "16px"}}>
                <par>Paciente: {consulta.paciente__nome}</par>
                <br/>
                <par>Horário da consulta: {GetHourMinute(consulta.horario, consulta.duracao)}</par>
            </div>
            <Row>
                <CustomButton title="Finalizar consulta" onClick={() => setShowRelatorioPopUp(true)} type="primary" disabled={realizada}/>
            </Row>
            <br/>
            <Row>
                <CustomButton title="Realizar avaliação nutricional" onClick={() => console.log("Avaliação Nutricional")} type="primary" disabled={realizada && !avaliada}/> <br/>
            </Row>
            <br/>
            <Row>
                <CustomButton title="Prescrever dieta" onClick={() => console.log("Prescreve dieta prescreve dieta")} type="primary" disabled={realizada && !dietado}/>
            </Row>
        </div>
    );
}