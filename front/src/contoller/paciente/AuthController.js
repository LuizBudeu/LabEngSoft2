import { useEffect, useState } from "react";
import { useAxiosWithToken } from "../../utils/useAxiosWithToken";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useSearchParams } from "react-router-dom";

export const Auth = () => {
    const [userId, setUserId] = useState();
    const [axios, hasToken] = useAxiosWithToken();
    const [searchParams, setSearchParams] = useSearchParams();
    const [userProfile, setUserProfile] = useState();

    const getUserId = () => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/id",
        ).then((response) => {
            let resp = response.data['user_id'];
            if(resp != null)
                setUserId(resp);
                setSearchParams({...searchParams, 'id': resp});
        }).catch((e) => {
            console.log(e);
        });
    }

    const createProfile = (e) => {
        console.log("createProfile");
        e.preventDefault();
        console.log(userProfile);
        axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/create_profile",
            userProfile
        ).then((response) => {
            let resp = response.data['user_id'];
            if(resp != null)
                setUserId(resp);
                setSearchParams({...searchParams, 'id': resp});
        }).catch((e) => {
            console.log(e);
        });
    }

    useEffect(() => {
        if(hasToken){
            getUserId(); 
        }
    }, [hasToken]);

    return [
        userId,
        createProfile,
        userProfile, 
        setUserProfile
    ];
    
};