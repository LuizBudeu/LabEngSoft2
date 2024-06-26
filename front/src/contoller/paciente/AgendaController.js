import { useState, useEffect } from "react";
import { formatNumber, API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useAxiosWithTokenPaciente } from "../../utils/useAxiosWithToken";
import { useSearchParams } from "react-router-dom";

export const GetAppointments = () => {

    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState();
    const [cardNumber, setCardNumber] = useState();
    const [showNewAppointmentPopUp, setShowNewAppointmentPopUp] = useState(false);
    const [showPayAppointmentPopUp, setPayNewAppointmentPopUp] = useState(false);
    const [axios] = useAxiosWithTokenPaciente();
    const [searchParams, setSearchParams] = useSearchParams();

    const user_id = searchParams.get("id");

    const refreshAppointments = () => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/agenda", {
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
        const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/cancel_consulta", {
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

    const payAppointment = async (appointment_id, ocupacao) => {
        const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/pay_consulta", {
            user_id: user_id,
            appointment_id: appointment_id,
            professional_type: ocupacao,
            card_number: cardNumber
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
        showNewAppointmentPopUp, 
        setShowNewAppointmentPopUp,
        showPayAppointmentPopUp, 
        setPayNewAppointmentPopUp,
        cancelAppointment,
        payAppointment,
        cardNumber, 
        setCardNumber
    ];
    
};

export const GetProfessionals = (onSuccess) => {

    const [professionals, setProfessionals] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState();
    const [professionalType, setProfessionalType] = useState(1);
    const [professionalName, setProfessionalName] = useState("");
    const [axios] = useAxiosWithTokenPaciente();
    const [searchParams, setSearchParams] = useSearchParams();

    const user_id = searchParams.get("id");

    const submitSearch = () => {
        
        setProfessionals([]);
        setSelectedProfessional(null);

        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/busca_profissionais", {
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

        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/horarios", {
            params: {
                user_id: user_id,
                professional_id: professional.id,
                type: professional.ocupacao
            }
        }).then((response) => {
            setHorarios(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    const requestAppointment = (horario, professional) => {
        let horario_utc = horario.hora
        horario_utc = horario.data + " " + formatNumber(horario_utc) + ":00:00"
        let date = new Date(horario_utc)
        axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/create_consulta", {
            user_id: user_id,
            professional_id: professional.id,
            professional_type: professional.ocupacao,
            horario: date,
            duracao: 60
        }).then((response) => {
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
      var days_array = Array(week_days).fill().map((_, idx) => {
        var custom_date = new Date(weekSunday);
        custom_date.setDate(weekSunday.getDate() + idx)
        return custom_date;
      });
      setDaysArray(days_array);
    }, [weekSunday])
  
    function next_week(){
      if(weekSunday < last_sunday){
        var customWeekSunday = new Date(weekSunday);
        customWeekSunday.setDate(customWeekSunday.getDate() + week_days);
        setWeekSunday(customWeekSunday);
      }
    }
  
    function last_week(){
      if(weekSunday > first_sunday){
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