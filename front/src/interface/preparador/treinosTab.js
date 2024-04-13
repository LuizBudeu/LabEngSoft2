import React, { useState } from "react";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { VerticalLine } from "../../components/verticalLine";
import { CenterContent } from "../../components/centerContent";
import { CustomButton } from "../../components/customButton";
import { Colors } from "../../utils/colors";
import { WorkOutForm } from "./components/workOutForm";
import { CreateWorkOut, GetWorkOuts, UpdateWorkOut } from "../../contoller/preparador/WorkOutController";
import { PopUpContainer } from "../../components/popUpContainer";
import { FormContainer } from "../../components/formContainer";
import { CustomImage } from "../../components/customImage";
import { ProfissionalIcons } from "../../utils/utils";

export const TreinosTab = () => {
    const { workOuts, refetch } = GetWorkOuts();
    const [selectedWorkOut, setSelectedWorkOut] = useState();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const {create} = CreateWorkOut();
    const {update} = UpdateWorkOut();
    
    const handleCreateSubmit = (e, workOut) => {
        e.preventDefault();
        create({
            workOut: {...workOut},
            onSuccess: () => {
                refetch();
                setShowCreateModal(false);
            },
            onError: () => console.log("Erro na criação do treino")
        });
    };

    const handleUpdateSubmit = (e, workOut) => {
        e.preventDefault();
        update({
            workOut: {...workOut},
            onSuccess: () => {
                refetch();
                setSelectedWorkOut(workOut);
                setShowUpdateModal(false);
            },
            onError: () => console.log("Erro na atualização do treino")
        });
    }

    const workOutItem = (item) => (
        <div 
            key={item.id}
            style={{
                backgroundColor: selectedWorkOut?.id === item.id ? Colors.LightGray : null, 
                borderRadius: "10px 0 0 10px",
                display: 'flex',
                flexDirection: 'row'
            }}
            onClick={()=> setSelectedWorkOut(item)}
        >
            <Row>
                <RowItem customPadding={5}>
                    <CustomImage imageUrl={ProfissionalIcons[3]}/>
                </RowItem>
                <RowItem grow>
                    <Row>
                        <text style={{alignSelf: "center"}}>{item.titulo}</text>
                    </Row>
                </RowItem>
            </Row> 
        </div>   
    )

    return(
        <>
            <WorkOutFormModal visible={showCreateModal} onSubmit={handleCreateSubmit} onClose={() => setShowCreateModal(false)}/>
            <WorkOutFormModal workOut={selectedWorkOut} visible={showUpdateModal} onSubmit={handleUpdateSubmit} onClose={() => setShowUpdateModal(false)}/>
            <Row>
                <RowItem grow noPadding>
                    <div style={{width: "100%"}}>
                        <h2>Seus treinos</h2>
                        <CustomButton title="Novo treino" onClick={() => setShowCreateModal(true)} type="primary" />
                        <div style={{marginTop: 10}}>
                            {workOuts && workOuts.map(workOutItem)}
                        </div>
                    </div>
                </RowItem>
                <RowItem>
                    <VerticalLine noPadding />
                </RowItem>
                <RowItem grow noPadding>
                    <CenterContent>
                        {selectedWorkOut ? (
                            <div style={{width: "100%"}}>
                                <h2>{selectedWorkOut.titulo}</h2>
                                <text style={{whiteSpace: "pre-line"}}>{selectedWorkOut.treino}</text>
                                <div style={{ marginTop: 10}}>
                                    <CustomButton title="Editar treino" onClick={() => setShowUpdateModal(true)} />
                                </div>
                            </div>
                            ) : (
                                <span>Selecione o seu treino</span>
                            )
                        }
                    </CenterContent>
                </RowItem>
            </Row>
        </>
    );
};

const WorkOutFormModal = ({workOut, visible, onSubmit, onClose}) => {
    return(
        <PopUpContainer showPopUp={visible} closePopUp={onClose}>
            <CenterContent>
                <FormContainer>
                    <WorkOutForm workOut={workOut} onSubmit={onSubmit}/>
                </FormContainer>
            </CenterContent>
        </PopUpContainer>
    );
}
