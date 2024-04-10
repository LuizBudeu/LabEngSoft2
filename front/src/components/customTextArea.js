import styled from 'styled-components'
import { Colors } from '../utils/colors';

const TextAreaStyle = styled.textarea`
  width: 100%;
  background-color: ${Colors.InputGray};
  border-radius: 10px;
  padding: 10px;
  border-color: transparent;
  box-sizing: border-box;
`;

export const CustomTextArea = ({name, onChange, value, placeholder, type, disabled}) => {

  return (
    <TextAreaStyle
      name={name}
      type={type}
      className="form-control mt-1"
      placeholder={placeholder}
      value={value}
      required
      onChange={onChange}
      disabled={disabled}
      autoFocus
      rows={20}
    />
  );
}; 