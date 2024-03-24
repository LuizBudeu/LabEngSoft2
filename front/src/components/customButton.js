import styled from 'styled-components'
import { Colors } from "../utils/colors";

export const CustomButton = ({title, onClick, isSubmit, type, disabled}) => {
  const ButtonStyle = styled.button`
    padding: 10px;
    border-radius: 10px;
    background-color: ${type=="primary" ? Colors.CenterFitBlue : Colors.White};
    border-color: ${type=="primary" ? Colors.CenterFitBlue : Colors.CancelRed};
    color: ${type=="primary" ? Colors.White : Colors.CancelRed};
    border-style: solid;
  `

  return (
    <ButtonStyle type={isSubmit ? "submit" : null} onClick={onClick} disabled={disabled}>
        {title}
    </ButtonStyle>
  );
};