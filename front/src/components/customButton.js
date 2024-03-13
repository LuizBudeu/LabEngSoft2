export const CustomButton = ({title, onClick, type}) => {
  return (
    <button className="btn btn-primary" type={type} onClick={onClick}>
        {title}
    </button>
  );
};