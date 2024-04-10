import React from "react";
import "./styles/Tabs.css";
import { AgendaList } from "../../components/agendaList";
import { GetAgenda } from "../../contoller/medico/AgendaController";

import { useState } from "react";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { VerticalLine } from "../../components/verticalLine";
import { GetHourMinute } from "../../utils/date";
import { CustomButton } from "../../components/customButton";
import { CenterContent } from "../../components/centerContent";

const AgendaTab = () => {
    const [agenda] = GetAgenda("2", "2021-01-01", "2024-12-31");
    const [selectedAppointment, setSelectedAppointment] = useState("");

    return (
        <>
            <Row>
                <RowItem grow noPadding>
                    <div style={{ width: "100%" }}>
                        <h2>Suas consultas</h2>
                        {agenda && <AgendaList appointments={agenda} selectedAppointment={selectedAppointment} onItemClick={(itemId) => setSelectedAppointment(itemId)} />}
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
                    )}
                </RowItem>
            </Row>
        </>
    );
};

const AppointmentInfo = ({ appointment }) => {
    return (
        <div>
            <div style={{ flexGrow: 1, width: "100%", padding: "16px" }}>
                <text>Paciente: {appointment.paciente__nome}</text>
                <text>Horário da consulta: {GetHourMinute(appointment.horario, appointment.duracao)}</text>
            </div>
            <Row>
                <CustomButton title="Realizar consulta" onClick={() => console.log("Realizar consulta")} type="primary" />
            </Row>
        </div>
    );
};
export default AgendaTab;
