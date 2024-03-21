import axios from "axios";
import { useState, useEffect } from "react";

export const GetProfile = (user_id) => {

    const [userProfile, setUserProfile] = useState();

    const resp_test = {
        'email': 'a@b.c',
        'nome': 'filipe arraia',
        'cpf': '1',
        'data_de_nascimento': '2002-04-30',
        'genero': 'outro',
        'cep': '00000-000',
        'logradouro': 'Travessa do Politécnico',
        'numero': '158',
        'complemento': '---',
        'crn': '12345678'
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/nutricionista/perfil", {
            params: {
                user_id: user_id
            }
        },
        ).then((response) => {
            setUserProfile(resp_test);
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