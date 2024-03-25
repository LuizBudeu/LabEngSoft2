import styled from 'styled-components'

const TextAreaStyle = styled.textarea`
  width: 100%;
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