import axios from "axios";

export const RealizarConsulta = async (consulta_id, pacientInfo) => {
    const path = `http://localhost:8000/api/preparador/consultas/${consulta_id}`
    try {
        const response = await axios.post(path, {...pacientInfo});
        
        if (response.status != 200){
            console.log("Resposta da criação", response.data);
            return false;
        }

        return true;
    } catch(e) {
        console.log("Erro ao criar relatório", e);
        return false
    }
};