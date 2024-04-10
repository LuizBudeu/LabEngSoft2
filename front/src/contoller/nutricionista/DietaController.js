import { useState, useEffect } from "react";
import { useAxiosWithToken } from "../../utils/useAxiosWithToken";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";

export const GetDieta = (consulta_id) => {

    const [dieta, setDieta] = useState();
    const axios = useAxiosWithToken();

    useEffect(() => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/nutricionista/perfil", {
            params: {
                consulta_id: consulta_id
            }
        },
        ).then((response) => {
            setDieta(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }, [])

    return [dieta, setDieta];
    
};

export const SalvaDieta = async (dieta_object) => {
    const axios = useAxiosWithToken();

    try{
        const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/nutricionista/salva_dieta", dieta_object); 
        if(response.status != 200){
            console.log(response.data);
            return false;
        }
        return response.data.dieta_id;
    }catch(e) {
        console.log(e);
        return false;
    }
};