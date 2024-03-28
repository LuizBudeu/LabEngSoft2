import axios from "axios";
import { useEffect, useState } from "react";
import { GroupByDate } from "../../utils/group";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";

export const GetAgenda = (user_id, start_date, end_date) => {
    const [agenda, setAgenda] = useState();

    const fetchAgenda = () => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/preparador/agenda/", {
            params: {
                user_id: user_id,
                start_date: start_date,
                end_date: end_date
            }
        },
        ).then((response) => {
            setAgenda(GroupByDate(response.data));
        }).catch((e) => {
            console.log(e);
        });
    }

    useEffect(() => {
        fetchAgenda();
    }, []);
    
    const refetch = () => {
        fetchAgenda();
    };

    return { agenda, refetch };
};
