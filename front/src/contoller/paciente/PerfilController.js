import axios from "../../interceptors/axios";
import { useState, useEffect } from "react";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";

export const GetProfile = (user_id) => {

    const [userProfile, setUserProfile] = useState();

    useEffect(() => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/perfil", {
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

export const UpdateProfile = async (user_id, userProfile) => {
    try{
        const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/update_perfil", 
            {...userProfile, user_id: user_id}
        ); 
        if(response.status != 200){
            console.log(response.data);
            return false;
        }
        return true;
    }catch(e) {
        console.log(e);
        return false;
    }
    
};