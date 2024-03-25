import { useState, useEffect } from "react";
import { CenterContent } from "../../components/centerContent";
import { Column } from "../../components/column";
import { RowItem } from "../../components/rowItem";
import { Row } from "../../components/row";
import { CustomButton } from "../../components/customButton";
// import DateTimePicker from 'react-datetime-picker';
// import 'react-datetime-picker/dist/DateTimePicker.css';
// import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';
import { getMonthName } from "../../utils/date";
import { formatNumber } from "../../utils/utils";
import { ScheduleItem } from "../../components/scheduleItem";
import { GetSchedule } from "../../contoller/paciente/AgendaController"; 


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
    <div style={{width: "100%", padding: "16px"}}>
      <CustomButton onClick={last_week} title={"last"}/>
      <CustomButton onClick={next_week} title={"next"}/>
      {getMonthName(weekSunday)} de {weekSunday.getFullYear()}
      {horarios ? (
        <Column>
          <Row>
            <RowItem/>
            {daysArray.map((day) =>
              <RowItem grow>{day.getDate()}</RowItem>
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
      <Row>
        <RowItem grow flex={3}>
          {selectedSchedule ? (
            <text>Selecionado dia {selectedSchedule.data} as {selectedSchedule.hora}h</text>
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