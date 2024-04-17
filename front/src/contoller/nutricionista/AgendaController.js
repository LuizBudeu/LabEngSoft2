import { GroupByDate } from "../../utils/group";
import { useState, useEffect } from "react";
import { useAxiosWithTokenNutricionista } from "../../utils/useAxiosWithToken";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useSearchParams } from "react-router-dom";

export const GetConsultas = (start_date, end_date) => {

    const [consultas, setConsultas] = useState([]);
    const [axios] = useAxiosWithTokenNutricionista();
    const [searchParams, setSearchParams] = useSearchParams();

    const user_id = API_PROTOCOL_HOSTNAME_PORT.includes("localhost") ? "4" : searchParams.get("id"); // Para testes locais, usa o id 4

    useEffect(() => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/nutricionista/agenda", {
            params: {
                user_id: user_id,
                start_date: start_date,
                end_date: end_date
            }
        },
        ).then((response) => {
            console.log(response)
            setConsultas(GroupByDate(response.data));
            // setConsultas(GroupByDate(consultasTeste));
        }).catch((e) => {
            console.log(e);
        });
    }, [user_id, start_date, end_date]);

    return [consultas, setConsultas];
    
};

export const GetProfile = (user_id) => {

    const [userProfile, setUserProfile] = useState();
    const [axios] = useAxiosWithTokenNutricionista();

    useEffect(() => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/perfil", {
            params: {
                user_id: user_id
            }
        },
        ).then((response) => {
            setUserProfile(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }, [])

    return [userProfile, setUserProfile];
    
};