import styled from 'styled-components'

const InputStyle = styled.input`
  width: 100%
`;

export const CustomInput = ({name, onChange, value, placeholder, type, disabled, notRequired}) => {
  return (
    <div>
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
    </div>
    
  );
};