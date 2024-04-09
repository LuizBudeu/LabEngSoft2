import { useState, useEffect } from "react";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useAxiosWithToken } from "../../utils/useAxiosWithToken";
import { useSearchParams } from "react-router-dom";

export const Auth = () => {
    const [axios, hasToken] = useAxiosWithToken();
    const [, setSearchParams] = useSearchParams();

    useEffect(() => {
        if(hasToken){
            axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/preparador/id",
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

export const GetProfile = () => {

    const [userProfile, setUserProfile] = useState();
    const [axios] = useAxiosWithToken();
    const [searchParams] = useSearchParams();

    const user_id = searchParams.get("id");

    const fetchProfile = () => {
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
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    const refetch = () => {
        fetchProfile();
    };

    return { userProfile, refetch };

};

export const UpdateProfile = async (user_id, userProfile, axios) => {

    try{
        const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/preparador/update_perfil",
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