import axios from "axios";
import { useState, useEffect } from "react";

export const GetProfile = (user_id) => {

    const [userProfile, setUserProfile] = useState();
    const [showPopUp, setShowPopUp] = useState(false);

    const refreshUserInfo = () => {
        axios.get(process.env.REACT_APP_PROTOCOL_HOSTNAME_PORT + "/api/paciente/perfil", {
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

        console.log("called submitProfile");
        console.log(userProfile);
        const response = await axios.post(process.env.REACT_APP_PROTOCOL_HOSTNAME_PORT + "/api/paciente/update_perfil", 
            {...userProfile, user_id: user_id}
        ); 
        if(response.status != 200){
            console.log(response.data);
            alert("Erro ao salvar os dados")
        }else{
            refreshUserInfo();
            setShowPopUp(false);
        }
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