import { useState, useEffect } from "react";
import { useAxiosWithTokenNutricionista } from "../../utils/useAxiosWithToken";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useSearchParams } from "react-router-dom";


export const Auth = () => {
    const [axios, hasToken] = useAxiosWithTokenNutricionista();
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
    }, [hasToken, axios, setSearchParams]);
};


export const GetProfile = () => {

    const [userProfile, setUserProfile] = useState();
    const [axios] = useAxiosWithTokenNutricionista();
    const [searchParams, ] = useSearchParams();

    const user_id = API_PROTOCOL_HOSTNAME_PORT.includes("localhost") ? "4" : searchParams.get("id"); // Usa id=4 para testes locais

    const updateProfile = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/nutricionista/update_perfil", 
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

    const reloadProfile = () => {
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
    };

    useEffect(() => {
        reloadProfile();
    }, []);

    return [userProfile, setUserProfile, updateProfile, reloadProfile];
    
};

