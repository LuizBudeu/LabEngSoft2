import axios from "axios";
import { useState, useEffect } from "react";
import { GroupByDate } from "../../utils/group";


export const GetAgenda = (user_id, start_date, end_date) => {
    const [agenda, setAgenda] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/medico/agenda", {
                params: {
                    user_id,
                    start_date,
                    end_date,
                },
            })
            .then((response) => {
                console.log(response.data);
                setAgenda(GroupByDate(response.data));
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return [agenda, setAgenda];
};
