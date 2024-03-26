import styled from 'styled-components'
import { Colors } from "../utils/colors";

const ButtonStyle = styled.button`
    padding: 10px;
    border-radius: 10px;
    background-color: ${({custom_type}) => custom_type=="primary" ? Colors.CenterFitBlue : Colors.White};
    border-color: ${({custom_type}) => custom_type=="primary" ? Colors.CenterFitBlue : Colors.CancelRed};
    color: ${({custom_type}) => custom_type=="primary" ? Colors.White : Colors.CancelRed};
    border-style: solid;
  `

export const CustomButton = ({title, onClick, isSubmit, type, disabled}) => {
  let custom_type = type;
  return (
    <ButtonStyle custom_type={custom_type} type={isSubmit ? "submit" : "button"} onClick={onClick} disabled={disabled}>
        {title}
    </ButtonStyle>
  );
};