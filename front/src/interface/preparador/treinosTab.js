import React from "react";
import { Row } from "../../components/row";
import { RowItem } from "../../components/rowItem";
import { VerticalLine } from "../../components/verticalLine";
import { CenterContent } from "../../components/centerContent";

export const TreinosTab = () => {
    return(
        <>
            <Row>
                <RowItem grow noPadding>
                    <div style={{width: "100%"}}>
                        <h2>Seus treinos</h2>
                    </div>
                </RowItem>
                <RowItem>
                    <VerticalLine noPadding />
                </RowItem>
                <RowItem grow noPadding>
                    <CenterContent>
                        <span>Selecione um treino</span>
                    </CenterContent>
                </RowItem>
            </Row>
        </>
    );
}