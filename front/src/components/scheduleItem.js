import styled from 'styled-components'
import { Colors } from '../utils/colors';

export const ScheduleItem = ({status, isSelected, onClick}) => {
    const ScheduleItemStyle = styled.div`
        height: 100%;
        width: 100%;
        background-color: ${isSelected ? Colors.SelectedBlue : status == 0 ? Colors.CenterFitBlue : Colors.InputGray};
        border:1px solid black;
    `

    return(
        <ScheduleItemStyle onClick={onClick}/>
    );
}