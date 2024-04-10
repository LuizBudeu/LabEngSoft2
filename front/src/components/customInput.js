import styled from 'styled-components';
import { Colors } from "../utils/colors";
import InputMask from 'react-input-mask';

const InputStyle = styled(InputMask)`
  width: 100%;
  background-color: ${({disabled}) => disabled ? Colors.DisabledInputGray : Colors.InputGray};
  border-radius: 10px;
  padding: 10px;
  border-color: transparent;
`;

export const CustomInput = ({name, onChange, value, placeholder, type, disabled, notRequired, mask}) => {
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
      mask={mask}
    />
  );
};