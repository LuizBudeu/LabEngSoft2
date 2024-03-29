import { useState, useEffect } from "react";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useAxiosWithToken } from "../../utils/useAxiosWithToken";

export const GetAcompanhemntos = (user_id) => {

    const [dieta, setDieta] = useState([]);
    const [treino, setTreino] = useState([]);
    const [examesMedico, setExamesMedico] = useState([]);
    const [examesNutricionais, setExamesNutricionais] = useState([]);
    const [selectedAcompanhamento, setSelectedAcompanhamento] = useState();
    const [showPopUp, setShowPopUp] = useState(false);
    const axios = useAxiosWithToken()

    const changeSelectedAcompanhamento = (acompanhamento, type) => {
        let professional = null;
        if(type=="exameMedico"){
            professional = {
                id: acompanhamento.medico_id,
                nome: acompanhamento.medico__nome,
                logradouro: acompanhamento.medico__logradouro,
                numero: acompanhamento.medico__numero,
                complemento: acompanhamento.medico__complemento
            };
        }else if(type=="exameNutricionista"){
            professional = {
                id: acompanhamento.Nutricionista_id,
                nome: acompanhamento.Nutricionista__nome,
                logradouro: acompanhamento.Nutricionista__logradouro,
                numero: acompanhamento.Nutricionista__numero,
                complemento: acompanhamento.Nutricionista__complemento
            };
        }
        console.log(professional);
        
        setSelectedAcompanhamento({
            type: type,
            acompanhamento: acompanhamento,
            professional: professional
        });
    }

    const refreshAcompanhamentos = () => {
        axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/paciente/acompanhamento", {
            params: {
                user_id: user_id
            }
        },
        ).then((response) => {
            let resp = response.data;
            setDieta(resp.dieta);
            setTreino(resp.treino);
            setExamesMedico(resp.examesMedico);
            setExamesNutricionais(resp.examesNutricionista);
        }).catch((e) => {
            console.log(e);
        });
    }

    useEffect(() => {
        refreshAcompanhamentos();
    }, [])

    return [
        dieta, 
        treino, 
        examesMedico, 
        examesNutricionais, 
        selectedAcompanhamento, 
        changeSelectedAcompanhamento,
        showPopUp, 
        setShowPopUp
    ];
    
};