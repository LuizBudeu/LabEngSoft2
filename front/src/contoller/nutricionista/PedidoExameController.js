import { useAxiosWithToken } from "../../utils/useAxiosWithToken";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";

export const SaveAvaliacao = async (nutricionista_id, paciente_id, tipo_exame) => {
    const axios = useAxiosWithToken();

    try{
        const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/nutricionista/update_perfil", 
            {
                nutricionista_id: nutricionista_id,
                paciente_id: paciente_id,
                tipo_exame: tipo_exame
            }
        ); 
        if(response.status != 200){
            console.log(response.data);
            return false;
        }
        return response.data.pedido_exame_id;
    }catch(e) {
        console.log(e);
        return false;
    }
    
};