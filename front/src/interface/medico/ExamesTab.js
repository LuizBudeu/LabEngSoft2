import React, {useState} from "react";
import {Row} from "../../components/row";
import {RowItem} from "../../components/rowItem";
import {VerticalLine} from "../../components/verticalLine";
import {CenterContent} from "../../components/centerContent";
import {Colors} from "../../utils/colors";
import {PedidoExameForm} from "./components/exameForm";
import {GetPedidosExames} from "../../contoller/medico/ExameController";
import {PopUpContainer} from "../../components/popUpContainer";
import {FormContainer} from "../../components/formContainer";
import {CustomButton} from "../../components/customButton";
import {FormatDate} from "../../utils/date";
import {FinalizaExameMedico} from "../../contoller/medico/ExameController";

const STATUS = {
    "0": 'Pendente',
    "1": 'Finalizado'
}

const ExamesTab = () => {
    const {pedidosExames, refetch} = GetPedidosExames();
    const [selectedPedidoExame, setSelectedPedidoExame] = useState();
    const {finalizar} = FinalizaExameMedico(selectedPedidoExame?.id);

    const [visible, setVisible] = useState(false);

    const handleFinalizarExame = (e) => {
        e.preventDefault();
        finalizar({
            onSuccess: () => {
                refetch();
                setSelectedPedidoExame({...selectedPedidoExame, status: "1"})
            },
            onError: () => alert("Erro ao finalizar exame")
        });
    };

    return (
        <>
            <Row>
                <RowItem grow noPadding>
                    <div style={{width: "100%"}}>
                        <h2>Seus exames</h2>

                        {
                            <>
                                {pedidosExames &&
                                    pedidosExames.map((pedidoExame) => (
                                        <div
                                            key={pedidoExame.id}
                                            style={{backgroundColor: selectedPedidoExame?.id === pedidoExame.id ? Colors.LightGray : null}}
                                            onClick={() => {
                                                setSelectedPedidoExame(pedidoExame);
                                            }}
                                        >
                                            <b>{pedidoExame.titulo}</b> {` (${STATUS[pedidoExame.status]})`}
                                        </div>
                                    ))}
                            </>
                        }
                    </div>
                </RowItem>
                <RowItem>
                    <VerticalLine noPadding/>
                </RowItem>
                <RowItem grow noPadding>
                    <CenterContent>
                        {selectedPedidoExame ? (
                            <div style={{width: "100%"}}>
                                <h2>{selectedPedidoExame.titulo}</h2>
                                <p>Paciente: {selectedPedidoExame.paciente__nome}</p>
                                <p>Status: {STATUS[selectedPedidoExame.status]}</p>
                                <p>Data: {FormatDate(selectedPedidoExame.created_at)}</p>

                                <CustomButton title="Finalizar pedido" isSubmit type="primary"
                                              onClick={handleFinalizarExame}/>
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
