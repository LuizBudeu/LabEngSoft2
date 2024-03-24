import { Colors } from "../utils/colors";
import { ProfissionalIcons } from "../utils/utils";
import { CustomImage } from "./customImage";
import { RowItem } from "./rowItem";
import { Row } from "./row";
import { StatusBadge } from "./statusBadge";

export const AppointmentItem = ({type, text, status, onClick, selected}) => {
  return (
    <div onClick={onClick} style={{'background-color': selected ? Colors.LightGray : null}}>
      <Row>
        <RowItem customPadding={5}>
          <CustomImage imageUrl={ProfissionalIcons[type]}/>
        </RowItem>
        <RowItem grow>
          <Row>
            <body>{text}</body>
            <RowItem noPadding center>
              <StatusBadge status={status} colapsed/>
            </RowItem>
            
          </Row>
        </RowItem>
      </Row>
    </div>
  );
};