import styled from 'styled-components'
import { Colors } from "../utils/colors";

export const PopUpContainer = ({showPopUp, closePopUp, children}) => {
    const PopUpContainerStyle = styled.div`
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: ${Colors.DarkGray}DD;
    `;

    const SolidStyle = styled.div`
        opacity: 1;
    `;

    const handleChildClick = (e) => {
        e.stopPropagation();
    };

    return(
        showPopUp &&
        <PopUpContainerStyle onClick={closePopUp}>
            <SolidStyle onClick={handleChildClick}>
                {children}
            </SolidStyle>
        </PopUpContainerStyle>
    )
}