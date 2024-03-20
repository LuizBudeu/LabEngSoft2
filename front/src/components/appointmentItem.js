import { TipoProfissional } from "../utils/options";
import { Colors } from "../utils/colors";

export const AppointmentItem = ({type, text, status, onClick, selected}) => {
  return (
    <div onClick={onClick} style={{'background-color': selected ? Colors.LightGray : null}}>
      <table>
        <tr>
          <td>{TipoProfissional[type]}</td>
        </tr>
        <tr>
          <td>{text}</td>
          {status == 1 ? (
            <td>(Cancelada)</td>
          ) : status == 4  && (
            <td>(Pendente)</td>
          )}
        </tr>
      </table>
    </div>
  );
};