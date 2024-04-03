import { GroupByDate } from "../../utils/group";
import { useState, useEffect } from "react";
import { useAxiosWithToken } from "../../utils/useAxiosWithToken";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";

export const GetConsultas = (user_id, start_date, end_date) => {

    const [consultas, setConsultas] = useState([]);
    const axios = useAxiosWithToken();
    
    // const consultasTeste = [
    //     {id: "001", paciente__nome: "Fulano", horario: "2024-03-21 15:00:00", duracao: 60},
    //     {id: "002", paciente__nome: "Sicrano", horario: "2024-03-21 16:00:00", duracao: 120},
    //     {id: "003", paciente__nome: "Beltrano", horario: "2024-03-22 13:00:00", duracao: 45},
    //     {id: "004", paciente__nome: "Felipe", horario: "2024-03-23 10:00:00", duracao: 15},
    //     {id: "005", paciente__nome: "Risco", horario: "2024-03-23 11:00:00", duracao: 60},
    // ];

    useEffect(() => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/nutricionista/agenda", {
            params: {
                user_id: user_id,
                start_date: start_date,
                end_date: end_date
            }
        },
        ).then((response) => {
            setConsultas(GroupByDate(response.data));
            // setConsultas(GroupByDate(consultasTeste));
        }).catch((e) => {
            console.log(e);
        });
    }, [user_id, start_date, end_date]);

    useEffect(() => {
        console.log("consultas")
        console.log(consultas)
    }, [consultas])

    return [consultas, setConsultas];
    
};

export const GetProfile = (user_id) => {

    const [userProfile, setUserProfile] = useState();
    const axios = useAxiosWithToken();

    useEffect(() => {
        axios.get("http://localhost:8000/api/paciente/perfil", {
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