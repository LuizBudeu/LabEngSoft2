import axios from "axios";
import { useState, useEffect } from "react";

export const GetAppointments = (user_id, start_date, end_date) => {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/nutricionista/agenda", {
            params: {
                user_id: user_id,
                start_date: start_date,
                end_date: end_date
            }
        },
        ).then((response) => {
            let sent_appointments = response.data;
            let appointments_by_date = [];
            sent_appointments.forEach(element => {
                let data = element.horario.split('T')[0];
                if(appointments_by_date[data] == null){
                    appointments_by_date[data] = [];
                }
                appointments_by_date[data].push(element);
            });
            console.log(sent_appointments);
            console.log(appointments_by_date);
            setAppointments(appointments_by_date);
            console.log("setted");
        }).catch((e) => {
            console.log(e);
        });
    }, [])

    useEffect(() => {
        console.log("appointments")
        console.log(appointments)
    }, [appointments])

    return [appointments, setAppointments];
    
};