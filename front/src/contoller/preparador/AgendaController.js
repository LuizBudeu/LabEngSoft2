import axios from "axios";
import { useEffect, useState } from "react";

export const GetAgenda = (user_id, start_date, end_date) => {
    const [agenda, setAgenda] = useState();
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/preparador/agenda", {
            params: {
                user_id: user_id,
                start_date: start_date,
                end_date: end_date
            }
        },
        ).then((response) => {
            setAgenda(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }, [user_id, start_date, end_date]);
    
    return [agenda, setAgenda];
};
