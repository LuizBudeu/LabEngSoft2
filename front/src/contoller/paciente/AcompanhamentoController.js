import { useState, useEffect } from "react";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useAxiosWithToken } from "../../utils/useAxiosWithToken";
import { useSearchParams } from "react-router-dom";

export const GetAcompanhemntos = () => {

    const [dieta, setDieta] = useState();
    const [treino, setTreino] = useState();
    const [examesMedico, setExamesMedico] = useState([]);
    const [examesNutricionais, setExamesNutricionais] = useState([]);
    const [selectedAcompanhamento, setSelectedAcompanhamento] = useState();
    const [showPopUp, setShowPopUp] = useState(false);
    const [axios] = useAxiosWithToken();
    const [searchParams, setSearchParams] = useSearchParams();

    const user_id = searchParams.get("id");

    const changeSelectedAcompanhamento = (acompanhamento, type) => {
        let professional = null;
        if(type=="exameMedico"){
            professional = {
                id: acompanhamento.medico_id,
                ocupacao: acompanhamento.medico__ocupacao,
                nome: acompanhamento.medico__nome,
                logradouro: acompanhamento.medico__logradouro,
                numero: acompanhamento.medico__numero,
                complemento: acompanhamento.medico__complemento
            };
        }else if(type=="exameNutricionista"){
            professional = {
                id: acompanhamento.nutricionista_id,
                ocupacao: acompanhamento.nutricionista__ocupacao,
                nome: acompanhamento.nutricionista__nome,
                logradouro: acompanhamento.nutricionista__logradouro,
                numero: acompanhamento.nutricionista__numero,
                complemento: acompanhamento.nutricionista__complemento
            };
        }
        
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