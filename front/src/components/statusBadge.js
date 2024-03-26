import styled from 'styled-components'
import { Colors } from "../utils/colors";
import { AppointmentStatus, AppointmentStatusString } from "../utils/utils";
import { CenterContent } from './centerContent';

export const StatusBadge = ({status, colapsed}) => {
  const BadgeStyle = styled.div`
    padding: ${colapsed ? null : "5px"};
    padding-left: ${colapsed ? null : "10px"};
    padding-right: ${colapsed ? null : "10px"};
    height: ${colapsed ? "20px" : "25px"};
    width: ${colapsed ? "20px" : null};
    border-radius: 20px;
    background-color: ${status==AppointmentStatus.cancelada ? Colors.CancelRed : Colors.WarningYellow};
    color: ${Colors.White};
  `

  return (
    (status==AppointmentStatus.cancelada || status==AppointmentStatus.pendente) ? (
      <BadgeStyle>
        <CenterContent>
          {colapsed ? null : AppointmentStatusString[status]}
        </CenterContent>
      </BadgeStyle>
    ) : (
      <div/>
    )
    
  );
};