import { useState, useEffect } from "react";
import { useAxiosWithTokenNutricionista } from "../../utils/useAxiosWithToken";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";


export const Auth = () => {
    const [axios, hasToken] = useAxiosWithToken();
    const [, setSearchParams] = useSearchParams();

    useEffect(() => {
        if(hasToken){
            axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/nutricionista/id",
            ).then((response) => {
                let resp = response.data['user_id'];
                if(resp != null)
                    setSearchParams({'id': resp});
            }).catch((e) => {
                console.log(e);
            });
        }
    }, [hasToken]);
};


export const GetProfile = (user_id) => {

    const [userProfile, setUserProfile] = useState();
    const [axios] = useAxiosWithTokenNutricionista();

    useEffect(() => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/nutricionista/perfil", {
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
    const [axios] = useAxiosWithTokenNutricionista();

    try{
        const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/nutricionista/update_perfil", 
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