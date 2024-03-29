export const CustomSelect = ({list, value, onChange}) => {
  console.log(value);
  return (
    <select value={value} defaultValue={3} onChange={onChange}>
      {Object.entries(list).map(([key, value]) => {
        return <option value={key}>{value}</option>
      })}
    </select>
  );
};