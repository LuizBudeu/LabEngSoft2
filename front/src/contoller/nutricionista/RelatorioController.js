import { useAxiosWithToken } from "../../utils/useAxiosWithToken";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";

export const SalvaRelatorio = async (relatorio_object) => {
    const axios = useAxiosWithToken();

    try{
        const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/nutricionista/consulta", relatorio_object); 
        if(response.status != 200){
            console.log(response.data);
            return false;
        }
        return response.data.relatorio_id;
    }catch(e) {
        console.log(e);
        return false;
    }
};