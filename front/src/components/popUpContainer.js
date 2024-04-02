import styled from 'styled-components'
import { Colors } from "../utils/colors";

const PopUpContainerStyle = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: ${Colors.DarkGray}DD;
    align-items: ${({center}) => center ? "center" : null};
    justify-content: ${({center}) => center ? "center" : null};
    display: ${({center}) => center ? "flex" : null};
`;

const SolidStyle = styled.div`
    opacity: 1;
`;

export const PopUpContainer = ({showPopUp, closePopUp, children, center}) => {
    const handleChildClick = (e) => {
        e.stopPropagation();
    };

    return(
        showPopUp &&
        <PopUpContainerStyle onClick={closePopUp} center={center}>
            <SolidStyle onClick={handleChildClick}>
                {children}
            </SolidStyle>
        </PopUpContainerStyle>
    )
}