import axios from "axios";
import { useEffect, useState } from "react";

export const CreateWorkOut = async (user_id, workOut) => {
    try{
        const response = await axios.post("http://localhost:8000/api/preparador/create_workout/", 
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
        axios.get("http://localhost:8000/api/preparador/workouts", {
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

