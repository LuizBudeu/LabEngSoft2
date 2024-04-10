import React from "react";
import { useState } from "react";
import { AgendaList } from "../../components/agendaList";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { VerticalLine } from "../../components/verticalLine";
import { GetConsultas, GetProfile } from "../../contoller/nutricionista/AgendaController";
import { GetHourMinute } from "../../utils/date";
import { CustomButton } from "../../components/customButton";
import { CenterContent } from "../../components/centerContent";
import { PopUpContainer } from "../../components/popUpContainer";
import { MainContainer } from "../../components/mainContainer";
import { EditPerfil } from "./DietaForm";

export const AgendaTab = () => {
    const [agenda] = GetConsultas("2024-01-01", "3024-01-01");

    const [selectedAppointment, setSelectedAppointment] = useState("");
    
    return(
        <div>
            <Row>
                <RowItem grow noPadding>
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
                </RowItem>
                <RowItem>
                    <VerticalLine noPadding />
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
    const [showConsultaPopUp, setShowConsultaPopUp] = useState(false);

    return (
        <div>
            <PopUpContainer showPopUp={showConsultaPopUp} closePopUp={() => setShowConsultaPopUp(false)}>
                <MainContainer>
                    <EditPerfil closePopUp={() => setShowConsultaPopUp(false)} mainUserId={test_id} setMainUserProfile={setUserProfile}/>
                </MainContainer>
            </PopUpContainer>

            <div style={{flexGrow: 1, width: "100%", padding: "16px"}}>
                <body>Paciente: {consulta.paciente__nome}</body>
                <body>Horário da consulta: {GetHourMinute(consulta.horario, consulta.duracao)}</body>
            </div>
            <Row>
                <CustomButton title="Realizar consulta" onClick={() => setShowConsultaPopUp(true)} type="primary" />
            </Row>
            <br/>
            <Row>
                <CustomButton title="Realizar avaliação" onClick={() => console.log("Avaliação Nutricional")} type="primary" />
                <CustomButton title="Prescrever dieta" onClick={() => console.log("Prescreve dieta prescreve dieta")} type="primary" />
            </Row>
            <br/>
            <Row>
                <CustomButton title="Solicitar exame" onClick={() => console.log("Pedido de exame")} type="primary" />
                <CustomButton title="Detalhes do paciente" onClick={() => console.log("Detalhes, detalhes")} type="primary" />
            </Row>
        </div>
    );
}