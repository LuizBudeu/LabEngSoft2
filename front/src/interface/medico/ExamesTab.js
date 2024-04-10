import React, { useState } from "react";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { VerticalLine } from "../../components/verticalLine";
import { CenterContent } from "../../components/centerContent";
import { Colors } from "../../utils/colors";
// import { pedidoExameForm } from "./components/pedidoExameForm";
import { GetPedidosExames } from "../../contoller/medico/ExameController";

const ExamesTab = () => {
    const [pedidosExames] = GetPedidosExames("2");
    const [selectedPedidoExame, setSelectedPedidoExame] = useState();

    const [visible, setVisible] = useState(false);

    const exameStatus = {
        0: "Pendente",
        1: "Finalizado",
    };

    return (
        <>
            <Row>
                <RowItem grow noPadding>
                    <div style={{ width: "100%" }}>
                        <h2>Seus exames</h2>
                        {
                            <>
                                {pedidosExames &&
                                    pedidosExames.map((pedidoExame) => (
                                        <div
                                            key={pedidoExame.id}
                                            style={{ backgroundColor: selectedPedidoExame?.id === pedidoExame.id ? Colors.LightGray : null }}
                                            onClick={() => setSelectedPedidoExame(pedidoExame)}
                                        >
                                            {pedidoExame.titulo}
                                        </div>
                                    ))}
                            </>
                        }
                    </div>
                </RowItem>
                <RowItem>
                    <VerticalLine noPadding />
                </RowItem>
                <RowItem grow noPadding>
                    <CenterContent>
                        {selectedPedidoExame ? (
                            <div style={{ width: "100%" }}>
                                <h2>{selectedPedidoExame.titulo}</h2>
                                <p>Paciente: {selectedPedidoExame.paciente__nome}</p>
                                <p>Status: {exameStatus[selectedPedidoExame.status]}</p>
                                <p>Data: {selectedPedidoExame.created_at}</p>
                            </div>
                        ) : (
                            <span>Selecione o seu pedido de exame</span>
                        )}
                    </CenterContent>
                </RowItem>
            </Row>
        </>
    );
};

export default ExamesTab;
