import { useEffect, useState } from "react";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useAxiosWithToken } from "../../utils/useAxiosWithToken";
import { useSearchParams } from "react-router-dom";

export const CreateWorkOut = async (user_id, workOut, axios) => {

    try{
        const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/preparador/create_workout", 
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

export const GetWorkOuts = () => {
    const [workOuts, setWorkOuts] = useState([]);
    const [axios] = useAxiosWithToken();
    const [searchParams] = useSearchParams();

    const user_id = searchParams.get("id");

    const fetchWorkOuts = () => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/preparador/workouts", {
            params: {
                user_id: user_id,
            }
        },
        ).then((response) => {
            setWorkOuts(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    useEffect(() => {
        fetchWorkOuts();
    }, []);

    const refetch = () => {
        fetchWorkOuts();
    };

    return { workOuts, refetch };
}

