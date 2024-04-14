import { useEffect, useState } from "react";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useAxiosWithTokenPreparador } from "../../utils/useAxiosWithToken";
import { useSearchParams } from "react-router-dom";

export const CreateWorkOut = () => {
    const [axios] = useAxiosWithTokenPreparador();
    const [searchParams] = useSearchParams();

    const user_id = searchParams.get("id");

    const create = ({workOut, onSuccess, onError}) => {
        axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/preparador/create_workout", 
            {...workOut, user_id}
        ).then(() => 
            onSuccess()
        ).catch(() =>
            onError()
        );
    };

    return {create};
};

export const UpdateWorkOut = () => {
    const [axios] = useAxiosWithTokenPreparador();

    const update = ({workOut, onSuccess, onError}) => {
        axios.put(API_PROTOCOL_HOSTNAME_PORT + "/api/preparador/update_workout/" + workOut.id, 
            {title: workOut.titulo, workout: workOut.treino}
        ).then(() => 
            onSuccess()
        ).catch(() =>
            onError()
        );
    };

    return {update};
};

export const GetWorkOuts = () => {
    const [workOuts, setWorkOuts] = useState([]);
    const [axios] = useAxiosWithTokenPreparador();
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
