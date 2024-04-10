import { useEffect, useState } from "react";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useAxiosWithToken } from "../../utils/useAxiosWithToken";

export const RegistrarFormulario = (consulta_id, pacientInfo) => {
    const [axios] = useAxiosWithToken();
    const path = `${API_PROTOCOL_HOSTNAME_PORT}/api/preparador/consultas/${consulta_id}/formulario`
    
    const registerForm = ({onSuccess, onError}) => {
        axios.post(path, {...pacientInfo}
        ).then(() => 
            onSuccess()
        ).catch((e) =>
            onError(e)
        );
    }

    return { registerForm };
};

export const FinalizarConsulta = (consulta_id) => {
    const [axios] = useAxiosWithToken();
    const path = `${API_PROTOCOL_HOSTNAME_PORT}/api/preparador/consultas/${consulta_id}`

    const finalizar = () => {
        axios.patch(path,
        ).catch((e) =>
            console.log(e)
        );
    }

    return { finalizar };
}

export const GetPacienteExtraInfo = (consulta_id) => {
    const [extraInfo, setExtraInfo] = useState({});
    const [axios] = useAxiosWithToken();

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
