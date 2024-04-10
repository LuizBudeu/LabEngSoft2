import styled from 'styled-components';
import { Colors } from "../utils/colors";

const InputStyle = styled.input`
  width: 100%;
  background-color: ${({disabled}) => disabled ? Colors.DisabledInputGray : Colors.InputGray};
  border-radius: 10px;
  padding: 10px;
  border-color: transparent;
  box-sizing: border-box;
`;

export const CustomInput = ({name, onChange, value, placeholder, type, disabled, notRequired}) => {
  return (
    <InputStyle
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      required={!notRequired}
      onChange={onChange}
      disabled={disabled}
    />
  );
};