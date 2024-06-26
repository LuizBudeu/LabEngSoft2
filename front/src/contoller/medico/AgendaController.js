import {useState, useEffect} from "react";
import {GroupByDate} from "../../utils/group";
import {API_PROTOCOL_HOSTNAME_PORT} from "../../utils/utils";
import {useAxiosWithTokenMedico} from "../../utils/useAxiosWithToken";
import {useSearchParams} from "react-router-dom";

export const GetAgenda = (start_date, end_date) => {
    const [agenda, setAgenda] = useState();
    const [axios] = useAxiosWithTokenMedico();
    const [searchParams] = useSearchParams();

    const user_id = searchParams.get("id");

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
                setAgenda(GroupByDate(response.data));
            })
            .catch((e) => {
                console.log(e);
            });
    }, [end_date, start_date, user_id]);

    return [agenda, setAgenda];
};
