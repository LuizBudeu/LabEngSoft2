import {useEffect, useState} from "react";
import {API_PROTOCOL_HOSTNAME_PORT} from "../../utils/utils";
import {useAxiosWithTokenMedico} from "../../utils/useAxiosWithToken";

export const RegistrarFormulario = (consulta_id, pacientInfo) => {
    const [axios] = useAxiosWithTokenMedico();
    const path = `${API_PROTOCOL_HOSTNAME_PORT}/api/medico/consultas/${consulta_id}/formulario`

    const registerForm = ({onSuccess, onError}) => {
        axios.post(path, {...pacientInfo}
        ).then(() =>
            onSuccess()
        ).catch((e) =>
            onError(e)
        );
    }

    return {registerForm};
};

export const FinalizarConsulta = (consulta_id) => {
    const [axios] = useAxiosWithTokenMedico();
    const path = `${API_PROTOCOL_HOSTNAME_PORT}/api/medico/consultas/${consulta_id}`

    const finalizar = () => {
        axios.patch(path,
        ).catch((e) =>
            console.log(e)
        );
    }

    return {finalizar};
}

export const GetPacienteExtraInfo = (consulta_id) => {
    const [extraInfo, setExtraInfo] = useState({});
    const [axios] = useAxiosWithTokenMedico();

    const path = `${API_PROTOCOL_HOSTNAME_PORT}/api/medico/consultas/${consulta_id}`

    const fetchData = () => {
        axios.get(path)
            .then((response) => setExtraInfo(response.data))
            .catch((e) => console.log(e));
    };
    console.log(path, extraInfo);

    useEffect(() => {
        fetchData();
    }, []);

    return {extraInfo};
}

export const GetLastMedicalReport = (paciente_id) => {
    const [lastReport, setLastReport] = useState({});
    const [axios] = useAxiosWithTokenMedico();

    const path = `${API_PROTOCOL_HOSTNAME_PORT}/api/medico/consultas/ultimo_relatorio`

    const fetchData = () => {
        axios.get(path, {
            params: {
                paciente_id
            }
        })
            .then((response) => setLastReport(response.data))
            .catch((e) => console.log(e));
    };
    console.log(path, lastReport);

    useEffect(() => {
        fetchData();
    }, []);

    return {lastReport};
}
