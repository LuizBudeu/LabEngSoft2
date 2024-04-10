import React, { useState } from "react";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { VerticalLine } from "../../components/verticalLine";
import { CenterContent } from "../../components/centerContent";
import { CustomButton } from "../../components/customButton";
import { Colors } from "../../utils/colors";
import { WorkOutForm } from "./components/workOutForm";
import { GetWorkOuts } from "../../contoller/preparador/WorkOutController";
import { PopUpContainer } from "../../components/popUpContainer";
import { FormContainer } from "../../components/formContainer";
import { CiDumbbell } from "react-icons/ci";

export const TreinosTab = () => {
    const { workOuts, refetch } = GetWorkOuts();
    const [selectedWorkOut, setSelectedWorkOut] = useState();

    const [visible, setVisible] = useState(false);
    
    const handleSubmit = () => {
        refetch();
        setVisible(false);
    };

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
                    <CiDumbbell size={50}/>
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
            <WorkOutFormModal visible={visible} onSubmit={handleSubmit} onClose={() => setVisible(false)}/>
            <Row>
                <RowItem grow noPadding>
                    <div style={{width: "100%"}}>
                        <h2>Seus treinos</h2>
                        <CustomButton title="Novo treino" onClick={() => setVisible(true)} type="primary" />
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

const WorkOutFormModal = ({visible, onSubmit, onClose}) => {
    return(
        <PopUpContainer showPopUp={visible} closePopUp={onClose}>
            <CenterContent>
                <FormContainer>
                    <WorkOutForm onSubmit={onSubmit}/>
                </FormContainer>
            </CenterContent>
        </PopUpContainer>
    );
}
