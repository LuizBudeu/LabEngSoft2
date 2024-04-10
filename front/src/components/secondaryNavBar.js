import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Row } from "./row";
import { RowItem } from "./rowItem";
import styled from 'styled-components'
import { Colors } from "../utils/colors";


export const SecondaryNavBar = ({tabs, activeTab, setActiveTab}) => {
    const BackgroundStyle = styled.div`
        background-color: ${Colors.White};
    `

    const ItemStyle = styled.div`
        padding: 10px;
        radius: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
        background-color: ${props => props.isActive ? Colors.BackgroundGray : Colors.White};
        font-weight: ${props => props.isActive ? "bold" : "regular"};
        color: ${Colors.CenterFitBlue};
    `

    return (
        <BackgroundStyle>
            <Row>
                {tabs.map((tab) => (
                    <RowItem grow center noPadding>
                        <ItemStyle onClick={() => setActiveTab(tab.id)} isActive={activeTab==tab.id}>
                            <span>{tab.displayName}</span>
                        </ItemStyle>
                        
                    </RowItem>
                ))}
            </Row>
        </BackgroundStyle>
    );
};
