import axios from "axios";
import { useState, useEffect } from "react";
import { formatNumber } from "../../utils/utils";

export const GetAppointments = (user_id) => {

    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState();
    const [showPopUp, setShowPopUp] = useState(false);

    const refreshAppointments = () => {
        axios.get("http://localhost:8000/api/paciente/agenda", {
            params: {
                user_id: user_id
            }
        },
        ).then((response) => {
            let resp_appointments = response.data;
            let appointments_by_date = [];
            resp_appointments.forEach(element => {
                let data = element.horario.split('T')[0];
                if(appointments_by_date[data] == null){
                    appointments_by_date[data] = [];
                }
                appointments_by_date[data].push(element);
            });
            setAppointments(appointments_by_date);
        }).catch((e) => {
            console.log(e);
        });
    }

    const cancelAppointment = async (appointment_id) => {
        console.log("cancelAppointment");
        console.log(appointment_id);
        const response = await axios.post("http://localhost:8000/api/paciente/cancel_consulta", {
            user_id: user_id,
            appointment_id: appointment_id
        });
        if(response.status != 200){
            console.log(response.data);
            return false;
        }
        setSelectedAppointment(null);
        refreshAppointments();
        return true;
    }

    const payAppointment = async (appointment_id) => {
        const response = await axios.post("http://localhost:8000/api/paciente/pay_consulta", {
            user_id: user_id,
            appointment_id: appointment_id
        });
        if(response.status != 200){
            console.log(response.data);
            return false;
        }
        setSelectedAppointment(null);
        refreshAppointments();
        return true;
    }

    useEffect(() => {
        refreshAppointments();
    }, [])

    return [
        appointments, 
        refreshAppointments,
        selectedAppointment, 
        setSelectedAppointment,
        showPopUp, 
        setShowPopUp,
        cancelAppointment,
        payAppointment
    ];
    
};

export const GetProfessionals = (user_id, onSuccess) => {

    const [professionals, setProfessionals] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState();
    const [professionalType, setProfessionalType] = useState(1);
    const [professionalName, setProfessionalName] = useState("");

    const submitSearch = (e) => {
        e.preventDefault();
        
        setProfessionals([]);

        axios.get("http://localhost:8000/api/paciente/busca_profissionais", {
            params: {
                user_id: user_id,
                type: professionalType,
                name: professionalName
            }
        },
        ).then((response) => {
            setProfessionals(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    const changeSelectedProfessional = (professional) => {
        setSelectedProfessional(professional);

        setHorarios([]);

        axios.get("http://localhost:8000/api/paciente/horarios", {
            params: {
                user_id: user_id,
                professional_id: professional.id
            }
        }).then((response) => {
            console.log(response.data);
            setHorarios(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    const requestAppointment = (horario, professional) => {
        let horario_utc = horario.hora
        horario_utc = horario.data + " " + formatNumber(horario_utc) + ":00:00"
        let date = new Date(horario_utc)
        axios.post("http://localhost:8000/api/paciente/create_consulta", {
            user_id: user_id,
            professional_id: professional.id,
            horario: date,
            duracao: 60
        }).then((response) => {
            console.log(response);
            if(response.status == 200){
                onSuccess();
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    return [
        professionals, 
        selectedProfessional, 
        professionalType, 
        setProfessionalType,
        professionalName, 
        setProfessionalName,
        submitSearch,
        changeSelectedProfessional,
        horarios,
        requestAppointment
    ];
    
};

export const GetSchedule = () => {

    var first_sunday = new Date();
    var [weekSunday, setWeekSunday] = useState(first_sunday);
    var [daysArray, setDaysArray] = useState([]);
    var [selectedSchedule, setSelectedSchedule] = useState();
    var week_days = 7
    var last_sunday = new Date();
    first_sunday.setDate(first_sunday.getDate() - first_sunday.getDay());
    last_sunday.setDate(first_sunday.getDate() + 4*week_days);
  
    var start_hour = 8;
    var end_hour = 18;
  
    var hours_array = Array(end_hour - start_hour + 1).fill().map((_, idx) => start_hour + idx)
  
    useEffect(()=>{
      console.log("atualiza lista de semanas")
      var days_array = Array(week_days + 1).fill().map((_, idx) => {
        var custom_date = new Date();
        custom_date.setDate(weekSunday.getDate() + idx)
        return custom_date;
      });
      setDaysArray(days_array);
    }, [weekSunday])
  
    function next_week(){
      console.log(weekSunday)
      console.log(last_sunday)
      if(weekSunday < last_sunday){
        console.log("passei 2");
        var customWeekSunday = new Date(weekSunday);
        customWeekSunday.setDate(customWeekSunday.getDate() + week_days);
        setWeekSunday(customWeekSunday);
      }
    }
  
    function last_week(){
      console.log(weekSunday)
      console.log(first_sunday)
      if(weekSunday > first_sunday){
        console.log("passei 1");
        var customWeekSunday = new Date(weekSunday);
        customWeekSunday.setDate(customWeekSunday.getDate() - week_days);
        setWeekSunday(customWeekSunday);
      }
    }

    return [
        weekSunday,
        daysArray,
        selectedSchedule,
        setSelectedSchedule,
        hours_array,
        next_week,
        last_week
    ];
    
};