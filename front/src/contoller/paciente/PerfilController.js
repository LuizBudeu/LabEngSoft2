import { useState, useEffect } from "react";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useAxiosWithToken, useAxiosWithTokenPaciente } from "../../utils/useAxiosWithToken";
import { useSearchParams } from "react-router-dom";

export const Auth = () => {
    const [userId, setUserId] = useState();
    const [axios, hasToken] = useAxiosWithTokenPaciente();
    const [searchParams, setSearchParams] = useSearchParams();
    const [userProfile, setUserProfile] = useState();

    const getUserId = () => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/id",
        ).then((response) => {
            let resp = response.data['user_id'];
            if(resp != null)
                setUserId(resp);
                setSearchParams({'id': resp});
        }).catch((e) => {
            console.log(e);
        });
    }

    const createProfile = (e) => {
        e.preventDefault();

        // Validate inputs
        if(userProfile.cpf.length == 14 && userProfile.cep.length == 9){
            let customUserProfile = userProfile;
            customUserProfile.cpf = customUserProfile.cpf.replaceAll(".", "").replace("-", "")
            customUserProfile.cep = customUserProfile.cep.replace("-", "")

            // Inputs validos
            axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/create_profile",
                userProfile
            ).then((response) => {
                let resp = response.data['user_id'];
                if(resp != null)
                    setUserId(resp);
                    setSearchParams({'id': resp});
            }).catch((e) => {
                console.log(e);
            });
            return;
        }
        alert("Erro nas informações submentidas");
        return;
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

export const GetProfile = () => {

    const [userProfile, setUserProfile] = useState();
    const [showPopUp, setShowPopUp] = useState(false);
    const [axios] = useAxiosWithTokenPaciente();
    const [searchParams, setSearchParams] = useSearchParams();

    const user_id = searchParams.get("id");

    const refreshUserInfo = () => {
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
    }

    useEffect(() => {
        refreshUserInfo();
    }, []);

    const submitProfile = async (e) => {
        e.preventDefault(); 
        if((userProfile.cep.length == 8 && userProfile.cep.indexOf('-') == -1) || (userProfile.cep.length == 9 && userProfile.cep.indexOf('-') > -1)){
            let customUserProfile = userProfile;
            customUserProfile.cep = customUserProfile.cep.replace("-", "")

            const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/update_perfil", 
                {...customUserProfile, user_id: user_id}
            ); 
            if(response.status != 200){
                console.log(response.data);
                alert("Erro ao salvar os dados")
            }else{
                refreshUserInfo();
                setShowPopUp(false);
            }
            return;
        }
        alert("Erro nas informações submentidas");
        return;
        
    };

    return [
        userProfile, 
        setUserProfile,
        refreshUserInfo,
        submitProfile,
        showPopUp,
        setShowPopUp
    ];
    
};