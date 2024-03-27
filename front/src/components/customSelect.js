import styled from 'styled-components';
import { Colors } from "../utils/colors";

const SelectStyle = styled.select`
  background-color: ${({disabled}) => disabled ? Colors.DisabledInputGray : Colors.InputGray};
  border-radius: 10px;
  padding: 10px;
  border-color: transparent;
`;

export const CustomSelect = ({list, value, onChange, disabled}) => {
  return (
    <SelectStyle value={value} onChange={onChange} disabled={disabled}>
      {Object.entries(list).map(([key, value]) => {
        return <option value={key}>{value}</option>
      })}
    </SelectStyle>
  );
};