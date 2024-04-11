import { useState, useEffect } from "react";
import { useAxiosWithTokenNutricionista } from "../../utils/useAxiosWithToken";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";

export const GetAvaliacao = (consulta_id) => {

    const [avaliacao, setAvaliacao] = useState();
    const axios = useAxiosWithTokenNutricionista();

    useEffect(() => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/nutricionista/perfil", {
            params: {
                consulta_id: consulta_id
            }
        },
        ).then((response) => {
            setAvaliacao(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }, [])

    return [avaliacao, setAvaliacao];
    
};

export const SaveAvaliacao = async (relatorio_id, avaliacao) => {
    const axios = useAxiosWithTokenNutricionista();

    try{
        const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/nutricionista/update_perfil", 
            {...avaliacao, relatorio_id: relatorio_id}
        ); 
        if(response.status != 200){
            console.log(response.data);
            return false;
        }
        return response.data.avaliacao_id;
    }catch(e) {
        console.log(e);
        return false;
    }
    
};