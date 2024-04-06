import styled from 'styled-components'
import { Colors } from "../utils/colors";

const getBackgroundColor = (custom_type, disabled) => {
  return custom_type=="primary" ? (disabled ? Colors.DisabledBlue : Colors.CenterFitBlue) : Colors.White;
}

const getBorderColor = (custom_type, disabled) => {
  let color = "";
  if(custom_type=="primary" || custom_type=="secondary"){
    color = (disabled ? Colors.DisabledBlue : Colors.CenterFitBlue);
  }else{
    color = (disabled ? Colors.DisabledRed : Colors.CancelRed);
  }
  return color;
}

const getTextColor = (custom_type, disabled) => {
  let color = "";
  if(custom_type=="primary"){
    color = Colors.White;
  }else if(custom_type=="secondary"){
    color = (disabled ? Colors.DisabledBlue : Colors.CenterFitBlue);
  }else{
    color = (disabled ? Colors.DisabledRed : Colors.CancelRed);
  }
  return color;
}

const ButtonStyle = styled.button`
    padding: 10px;
    border-radius: 10px;
    background-color: ${({custom_type, disabled}) => getBackgroundColor(custom_type, disabled)};
    border-color: ${({custom_type, disabled}) => getBorderColor(custom_type, disabled)};
    color: ${({custom_type, disabled}) => getTextColor(custom_type, disabled)};
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