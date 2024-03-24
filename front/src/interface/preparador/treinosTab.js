import React, { useState } from "react";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { VerticalLine } from "../../components/verticalLine";
import { CenterContent } from "../../components/centerContent";
import { CustomButton } from "../../components/customButton";
import { Colors } from "../../utils/colors";
import { WorkOutForm } from "./components/workOutForm";
import { GetWorkOuts } from "../../contoller/preparador/WorkOutController";

export const TreinosTab = () => {
    const [workOuts] = GetWorkOuts("3");
    const [selectedWorkOut, setSelectedWorkOut] = useState();

    const [visible, setVisible] = useState(false);

    return(
        <>
            <Row>
                <RowItem grow noPadding>
                    <div style={{width: "100%"}}>
                        <h2>Seus treinos</h2>
                        {visible ? (
                            <WorkOutForm onSubmit={() => setVisible(false)}/>
                        ) : (
                            <>
                                <CustomButton title="Novo treino" onClick={() => setVisible(true)} type="primary" />
                                {workOuts && workOuts.map((workout) => <div key={workout.id} style={{backgroundColor: selectedWorkOut?.id === workout.id ? Colors.LightGray : null}} onClick={()=> setSelectedWorkOut(workout)}>{workout.titulo}</div>)}
                            </>
                        )}
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
                                <body style={{whiteSpace: "pre-line"}}>{selectedWorkOut.treino}</body>
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
}
