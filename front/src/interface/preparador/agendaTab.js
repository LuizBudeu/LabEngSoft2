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

const mockedAgenda = [
    {id: "001", paciente__nome: "Vinicius", horario: "2024-03-21 15:00:00", duracao: 60},
    {id: "002", paciente__nome: "Henrique", horario: "2024-03-21 16:00:00", duracao: 60},
    {id: "003", paciente__nome: "Luis", horario: "2024-03-22 13:00:00", duracao: 60},
    {id: "004", paciente__nome: "Felipe", horario: "2024-03-23 10:00:00", duracao: 60},
    {id: "005", paciente__nome: "Rafael", horario: "2024-03-23 11:00:00", duracao: 60},
];

export const AgendaTab = () => {
    const [agenda] = GetAgenda("3", "2024-03-20", "2024-04-24");
    // const appts = groupByDate(mockedAgenda);

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

const AppointmentInfo = ({appointment}) => {
    return (
        <div>
            <div style={{flexGrow: 1, width: "100%", padding: "16px"}}>
                <body>Paciente: {appointment.paciente__nome}</body>
                <body>Horário da consulta: {GetHourMinute(appointment.horario, appointment.duracao)}</body>
            </div>
            <Row>
                <CustomButton title="Realizar consulta" onClick={() => console.log("Realizar consulta")} type="primary" />
            </Row>
        </div>
    );
}