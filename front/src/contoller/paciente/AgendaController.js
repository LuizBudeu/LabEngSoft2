import axios from "axios";
import { useState, useEffect } from "react";

export const GetAppointments = (user_id) => {

    const [appointmentss, setAppointmentss] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/paciente/agenda", {
            params: {
                user_id: user_id
            }
        },
        ).then((response) => {
            let appointments = response.data;
            let appointments_by_date = [];
            appointments.forEach(element => {
                let data = element.horario.split('T')[0];
                if(appointments_by_date[data] == null){
                    appointments_by_date[data] = [];
                }
                appointments_by_date[data].push(element);
            });
            console.log(appointments);
            console.log(appointments_by_date);
            setAppointmentss(appointments_by_date);
            console.log("setted");
        }).catch((e) => {
            console.log(e);
        });
    }, [])

    useEffect(() => {
        console.log("appointmentss")
        console.log(appointmentss)
    }, [appointmentss])

    return [appointmentss, setAppointmentss];
    
};