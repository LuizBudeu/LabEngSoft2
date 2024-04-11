import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Row } from "./row";
import { RowItem } from "./rowItem";
import styled from 'styled-components'
import { Colors } from "../utils/colors";
import { useLogout } from "../utils/useLogout";
import { CustomButton } from "./customButton";


export const TopBar = ({type}) => {
    const logout = useLogout(type);
    const BackgroundStyle = styled.div`
        background-color: ${Colors.CenterFitBlue};
    `;

    const LogoStyle = styled.text`
        color: ${Colors.White};
    `;

    return (
        <BackgroundStyle>
            <Row>
                <RowItem center>
                    <LogoStyle>CenterFit</LogoStyle>
                </RowItem>
                <RowItem>
                    <CustomButton
                        type='secondary'
                        title='Logout'
                        onClick={logout}
                    />
                </RowItem>
            </Row>
        </BackgroundStyle>
    );
};
