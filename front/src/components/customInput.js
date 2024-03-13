export const CustomInput = ({name, onChange, value, placeholder, type, disabled}) => {
  return (
    <input
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