import styled from 'styled-components'

export const CustomInput = ({name, onChange, value, placeholder, type, disabled, notRequired}) => {
  const InputStyle = styled.input`
    width: 100%
  `;

  return (
    <InputStyle
      name={name}
      type={type}
      className="form-control mt-1"
      placeholder={placeholder}
      value={value}
      required={!notRequired}
      onChange={onChange}
      disabled={disabled}
    />
  );
};