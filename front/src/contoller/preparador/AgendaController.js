import { useEffect, useState } from "react";
import { GroupByDate } from "../../utils/group";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useAxiosWithTokenPreparador } from "../../utils/useAxiosWithToken";
import { useSearchParams } from "react-router-dom";

export const GetAgenda = () => {
    const [agenda, setAgenda] = useState();
    const [axios] = useAxiosWithTokenPreparador();
    const [searchParams] = useSearchParams();

    const user_id = searchParams.get("id");
    
    const fetchAgenda = () => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/preparador/agenda", {
            params: {
                user_id: user_id,
                start_date: dateToQueryParam(new Date()),
                end_date: dateToQueryParam(new Date(2024,11,31))
            }
        },
        ).then((response) => {
            setAgenda(GroupByDate(response.data));
        }).catch((e) => {
            console.log(e);
        });
    };

    useEffect(() => {
        fetchAgenda();
    }, []);
    
    const refetch = () => {
        fetchAgenda();
    };

    return { agenda, refetch };
};

const dateToQueryParam = (date) => `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
