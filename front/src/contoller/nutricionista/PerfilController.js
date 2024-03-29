import axios from "../../interceptors/axios";
import { useState, useEffect } from "react";

export const GetProfile = (user_id) => {

    const [userProfile, setUserProfile] = useState();

    useEffect(() => {
        axios.get("http://localhost:8000/api/nutricionista/perfil", {
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
        const response = await axios.post("http://localhost:8000/api/nutricionista/update_perfil", 
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