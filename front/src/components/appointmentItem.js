import styled from 'styled-components';
import { Colors } from "../utils/colors";
import { ProfissionalIcons } from "../utils/utils";
import { CustomImage } from "./customImage";
import { RowItem } from "./rowItem";
import { Row } from "./row";
import { StatusBadge } from "./statusBadge";

const ContainerStyle = styled.div`
  background-color: ${({selected}) => selected ? Colors.LightGray : "null"};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const AppointmentItem = ({type, text, status, onClick, selected}) => {
  return (
    <ContainerStyle onClick={onClick} selected={selected}>
      <Row>
        <RowItem customPadding={5}>
          <CustomImage imageUrl={ProfissionalIcons[type]}/>
        </RowItem>
        <RowItem grow>
          <Row>
            <text>{text}</text>
            <RowItem noPadding center>
              <StatusBadge status={status} colapsed/>
            </RowItem>
            
          </Row>
        </RowItem>
      </Row>
    </ContainerStyle>
  );
};
