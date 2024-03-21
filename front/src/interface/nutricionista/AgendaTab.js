import React from "react";
import { useState } from "react";
import { AgendaList } from "../../components/agendaList";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { VerticalLine } from "../../components/verticalLine";
import { GetConsultas } from "../../contoller/nutricionista/AgendaController";
import { GetHourMinute } from "../../utils/date";
import { CustomButton } from "../../components/customButton";
import { CenterContent } from "../../components/centerContent";
import { PopUpContainer } from "../../components/popUpContainer";

export const AgendaTab = () => {
    const [agenda] = GetConsultas("1" /* A SER PREENCHIDO COM ID DO NUTRICIONISTA APÓS INTEGRAÇÃO */,
                                  "2024-01-01", "3024-01-01");

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
                            <ConsultaInfo consulta={selectedAppointment} />
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

const ConsultaInfo = ({consulta}) => {
    return (
        <div>
            <div style={{flexGrow: 1, width: "100%", padding: "16px"}}>
                <body>Paciente: {consulta.paciente__nome}</body>
                <body>Horário da consulta: {GetHourMinute(consulta.horario, consulta.duracao)}</body>
            </div>
            <Row>
                <CustomButton title="     Realizar consulta     " onClick={() => console.log("Realizar consulta")} type="primary" />
            </Row>
            <br/>
            <Row>
                <CustomButton title="Realizar avaliação" onClick={() => console.log("Avaliação Nutricional")} type="primary" />
                <CustomButton title="Prescrever dieta" onClick={() => console.log("Prescreve dieta prescreve dieta")} type="primary" />
            </Row>
            <br/>
            <Row>
                <CustomButton title="Solicitar exame" onClick={() => console.log("Pedido de exame")} type="primary" />
                <CustomButton title="Detalhes do paciente" onClick={() => console.log("Detalhes, detalhes")} type="secondary" />
            </Row>
        </div>
    );
}