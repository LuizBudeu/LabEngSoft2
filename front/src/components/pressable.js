export const Pressable = ({onClick, children}) => {
  return (
    <div onClick={onClick}>
        {children}
    </div>
  );
};