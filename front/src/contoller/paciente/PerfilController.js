import axios from "axios";
import { useState, useEffect } from "react";

export const GetProfile = (user_id) => {

    console.log("user_id: " + user_id);

    const [userProfile, setUserProfile] = useState();

    useEffect(() => {
        axios.get("http://localhost:8000/api/paciente/perfil", {
            params: {
                user_id: user_id
            }
        },
        ).then((response) => {
            console.log("capturado");
            console.log(response.data);
            setUserProfile(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }, [])
    
    console.log("preparado");

    return [userProfile];
    
};