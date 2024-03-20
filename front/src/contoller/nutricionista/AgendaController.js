import axios from "axios";
import { groupByDate } from "../../utils/group";
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
            setAppointments(groupByDate(response.data));
        }).catch((e) => {
            console.log(e);
        });
    }, [user_id, start_date, end_date]);

    useEffect(() => {
        console.log("appointments")
        console.log(appointments)
    }, [appointments])

    return [appointments, setAppointments];
    
};