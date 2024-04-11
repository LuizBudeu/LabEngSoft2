import { useEffect, useState } from "react";
import { GroupByDate } from "../../utils/group";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useAxiosWithTokenPreparador } from "../../utils/useAxiosWithToken";
import { useSearchParams } from "react-router-dom";

export const GetAgenda = (start_date, end_date) => {
    const [agenda, setAgenda] = useState();
    const [axios] = useAxiosWithTokenPreparador();
    const [searchParams] = useSearchParams();

    const user_id = searchParams.get("id");
    
    const fetchAgenda = () => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/preparador/agenda", {
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
