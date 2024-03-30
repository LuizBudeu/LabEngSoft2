import axios from "axios";
import { useEffect, useState } from "react";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";

export const RegistrarFormulario = async (consulta_id, pacientInfo) => {
    const path = `${API_PROTOCOL_HOSTNAME_PORT}/api/preparador/consultas/${consulta_id}/formulario`
    try {
        const response = await axios.post(path, {...pacientInfo});
        
        if (response.status != 200){
            console.log("Resposta da criação", response.data);
            return false;
        }

        return true;
    } catch(e) {
        console.log("Erro ao criar relatório", e);
        return false;
    }
};

export const FinalizarConsulta = async (consulta_id) => {
    const path = `${API_PROTOCOL_HOSTNAME_PORT}/api/preparador/consultas/${consulta_id}`
    
    try {
        const response = await axios.patch(path);
        
        if (response.status != 200) {
            return false;
        }
        return true;
    } catch(e) {
        console.log("Erro ao alterar estado da consulta", e);
        return false;
    }
}

export const GetPacienteExtraInfo = (consulta_id) => {
    const [extraInfo, setExtraInfo] = useState({});
    
    const path = `${API_PROTOCOL_HOSTNAME_PORT}/api/preparador/consultas/${consulta_id}`
    
    const fetchData = () => {
        axios.get(path)
            .then((response) => setExtraInfo(response.data))
            .catch((e) => console.log(e));
    };
    console.log(path, extraInfo);

    useEffect(() => {
        fetchData();
    }, []);

    return { extraInfo };
}
