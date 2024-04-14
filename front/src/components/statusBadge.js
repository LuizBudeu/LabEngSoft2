import styled from 'styled-components'
import { Colors } from "../utils/colors";
import { AppointmentStatus, AppointmentStatusString } from "../utils/utils";
import { CenterContent } from './centerContent';

const BadgeColor = (status) => {
  if(status==AppointmentStatus.cancelada){
    return Colors.CancelRed;
  }else if(status==AppointmentStatus.pendente){
    return Colors.WarningYellow;
  }else{
    return Colors.CenterFitBlue;
  }
}

const BadgeStyle = styled.div`
    padding: ${({colapsed}) => colapsed ? null : "5px"};
    padding-left: ${({colapsed}) => colapsed ? null : "10px"};
    padding-right: ${({colapsed}) => colapsed ? null : "10px"};
    height: ${({colapsed}) => colapsed ? "20px" : "25px"};
    width: ${({colapsed}) => colapsed ? "20px" : null};
    border-radius: 20px;
    background-color: ${({status}) => BadgeColor(status)};
    color: ${Colors.White};
  `

export const StatusBadge = ({status, colapsed}) => {

  return (
    (status==AppointmentStatus.cancelada || status==AppointmentStatus.pendente || status==AppointmentStatus.realizada) ? (
      <BadgeStyle colapsed={colapsed} status={status}>
        <CenterContent>
          {colapsed ? null : AppointmentStatusString[status]}
        </CenterContent>
      </BadgeStyle>
    ) : (
      <div/>
    )
    
  );
};