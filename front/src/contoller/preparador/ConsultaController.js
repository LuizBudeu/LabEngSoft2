import { useEffect, useState } from "react";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useAxiosWithTokenPreparador } from "../../utils/useAxiosWithToken";

export const RegistrarFormulario = (consulta_id, pacientInfo) => {
    const [axios] = useAxiosWithTokenPreparador();
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

export const FinalizarConsulta = () => {
    const [axios] = useAxiosWithTokenPreparador();

    const finalizar = ({consulta_id, onSuccess, onError}) => {
        axios.patch(`${API_PROTOCOL_HOSTNAME_PORT}/api/preparador/consultas/${consulta_id}`,
        ).then(() =>
            onSuccess()
        ).catch((error) =>
            onError(error)
        );
    }

    return { finalizar };
}

export const GetPacienteExtraInfo = (consulta_id) => {
    const [extraInfo, setExtraInfo] = useState({});
    const [axios] = useAxiosWithTokenPreparador();

    const path = `${API_PROTOCOL_HOSTNAME_PORT}/api/preparador/consultas/${consulta_id}`
    
    useEffect(() => {
        axios.get(path)
            .then((response) => setExtraInfo(response.data))
            .catch((e) => console.log(e));
    }, [path]);

    return [extraInfo];
}
