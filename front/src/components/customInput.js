import styled from 'styled-components'

const InputStyle = styled.input`
  width: 100%
`;

export const CustomInput = ({name, onChange, value, placeholder, type, disabled}) => {

  return (
    <InputStyle
      name={name}
      type={type}
      className="form-control mt-1"
      placeholder={placeholder}
      value={value}
      required
      onChange={onChange}
      disabled={disabled}
    />
  );
};