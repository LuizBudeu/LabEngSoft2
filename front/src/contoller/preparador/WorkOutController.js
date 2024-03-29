import axios from "../../interceptors/axios";
import { useEffect, useState } from "react";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";

export const CreateWorkOut = async (user_id, workOut) => {
    try{
        const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/preparador/create_workout/", 
            {...workOut, user_id}
        );

        if(response.status != 200){
            console.log("Resposta da criação", response.data);
            return false;
        }

        return true;
    }catch(e) {
        console.log("Erro na criação", e);
        return false;
    }

};

export const GetWorkOuts = (user_id) => {
    const [workOuts, setWorkOuts] = useState([]);

    useEffect(() => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/preparador/workouts", {
            params: {
                user_id: user_id,
            }
        },
        ).then((response) => {
            setWorkOuts(response.data);
        }).catch((e) => {
            console.log(e);
        })
    }, [user_id]);

    return [workOuts, setWorkOuts];
}

