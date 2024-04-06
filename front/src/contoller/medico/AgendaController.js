import { useState, useEffect } from "react";
import { GroupByDate } from "../../utils/group";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useAxiosWithToken } from "../../utils/useAxiosWithToken";

export const GetAgenda = (user_id, start_date, end_date) => {
    const [agenda, setAgenda] = useState();
    const [axios] = useAxiosWithToken();

    useEffect(() => {
        axios
            .get(API_PROTOCOL_HOSTNAME_PORT + "/api/medico/agenda", {
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
    }, [end_date, start_date, user_id]);

    return [agenda, setAgenda];
};
