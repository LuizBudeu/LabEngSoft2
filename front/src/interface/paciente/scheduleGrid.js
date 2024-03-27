import { useState, useEffect } from "react";
import styled from 'styled-components'
import { Colors } from "../../utils/colors";
import { CenterContent } from "../../components/centerContent";
import { Column } from "../../components/column";
import { RowItem } from "../../components/rowItem";
import { Row } from "../../components/row";
import { CustomButton } from "../../components/customButton";
// import DateTimePicker from 'react-datetime-picker';
// import 'react-datetime-picker/dist/DateTimePicker.css';
// import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';
import { getMonthName, getDate, getWeekDayName } from "../../utils/date";
import { formatNumber } from "../../utils/utils";
import { ScheduleItem } from "../../components/scheduleItem";
import { Pressable } from "../../components/pressable";
import { GetSchedule } from "../../contoller/paciente/AgendaController"; 
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const ContainerStyle = styled.div`
  width: 98%;
  padding: 16px;
  background-color: ${Colors.InputGray};
  border-radius: 10px;
  box-shadow: inset gray 0px 10px 20px -12px;
`;

export const ScheduleGrid = ({horarios, professional, requestAppointment}) => {

  const [
    weekSunday,
    daysArray,
    selectedSchedule,
    setSelectedSchedule,
    hours_array,
    next_week,
    last_week
  ] = GetSchedule();

  return (
    <div>
      <ContainerStyle>
        <Row>
          <RowItem/>
          <RowItem center noPadding>
            <Pressable onClick={last_week}>
              <GoArrowLeft />
            </Pressable>
          </RowItem>
          
          <RowItem center noPadding>
            <Pressable onClick={next_week}>
              <GoArrowRight />
            </Pressable>
          </RowItem>
          
          <RowItem grow noPadding center>
            <text style={{fontWeight: "bold"}}>{getMonthName(weekSunday)} de {weekSunday.getFullYear()}</text>
          </RowItem>
          
        </Row>
        {horarios ? (
          <Column>
            <Row>
              <RowItem/>
              {daysArray.map((day) =>
                <RowItem grow noPadding>
                  <Column>
                    <text>{day.getDate()}</text>
                    <text>{getWeekDayName(day)}</text>
                  </Column>
                </RowItem>
              )}
            </Row>
            {hours_array.map((hour) => 
              <Row>
                <RowItem noPadding>{formatNumber(hour)}h</RowItem>
                {daysArray.map((day) => {
                  let day_string = day.getFullYear()+"-"+formatNumber(day.getMonth()+1)+"-"+formatNumber(day.getDate());
                  var schedule = horarios.find((item) => item.data == day_string && item.hora == hour);
                  let status = (schedule == null? 1 : schedule.status)
                  return(<RowItem grow noPadding>
                    <ScheduleItem 
                      status={status} 
                      isSelected={schedule ? schedule == selectedSchedule : false}
                      onClick={() => schedule && status == 0 ? setSelectedSchedule(schedule) : null}
                    />
                  </RowItem>)
                })}
              </Row>
            )}
          </Column>
        ) : (
          <CenterContent>
            <text>Não foi possível carregar os horários</text>
          </CenterContent>
        )}
      </ContainerStyle>
      <Row>
        <RowItem grow flex={3}>
          {selectedSchedule ? (
            <text>Selecionado dia {getDate(selectedSchedule.data)} as {selectedSchedule.hora}h</text>
          ) : (
            <text>Selecione um horário</text>
          )}
          
        </RowItem>
        <RowItem grow>
          <CustomButton 
            type="primary" 
            onClick={() => requestAppointment(selectedSchedule, professional)} 
            title={"Reservar horário"} 
            disabled={selectedSchedule == null}
          />
        </RowItem>
      </Row>
    </div>
    
  );
};