import { useState, useEffect } from "react";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useAxiosWithToken } from "../../utils/useAxiosWithToken";

export const GetProfile = (user_id) => {

    const [userProfile, setUserProfile] = useState();
    const axios = useAxiosWithToken();

    useEffect(() => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/preparador/perfil", {
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
    const axios = useAxiosWithToken();
    
    try{
        const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/update_perfil", 
            {...userProfile, user_id: user_id}
        ); 
        if(response.status !== 200){
            console.log(response.data);
            return false;
        }
        return true;
    }catch(e) {
        console.log(e);
        return false;
    }
    
};