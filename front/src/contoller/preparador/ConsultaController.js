import axios from "axios";

export const RegistrarFormulario = async (consulta_id, pacientInfo) => {
    const path = `http://localhost:8000/api/preparador/consultas/${consulta_id}/formulario`
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
    const path = `http://localhost:8000/api/preparador/consultas/${consulta_id}`
    
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
