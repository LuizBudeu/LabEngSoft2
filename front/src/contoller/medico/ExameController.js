import {useEffect, useState} from "react";
import {API_PROTOCOL_HOSTNAME_PORT} from "../../utils/utils";
import {useAxiosWithTokenMedico} from "../../utils/useAxiosWithToken";
import {useSearchParams} from "react-router-dom";

export const PedirExameMedico = (paciente_id, titulo) => {
    const [axios] = useAxiosWithTokenMedico();
    const [searchParams] = useSearchParams();

    const medico_id = searchParams.get("id");

    const create = ({onSuccess, onError}) => {
        axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/medico/pedir_exame",
            {
                medico_id,
                paciente_id,
                titulo
            }
        ).then(() =>
            onSuccess()
        ).catch(() =>
            onError()
        );
    };

    return {create};
};

export const GetPedidosExames = () => {
    const [searchParams] = useSearchParams();

    const user_id = searchParams.get("id");
    const [pedidosExames, setPedidosExames] = useState([]);
    const [axios] = useAxiosWithTokenMedico();

    const fetchPedidosExames = () => {
        axios
            .get(API_PROTOCOL_HOSTNAME_PORT + "/api/medico/pegar_exames", {
                params: {
                    user_id,
                },
            })
            .then((response) => {
                setPedidosExames(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        fetchPedidosExames();
    }, []);

    const refetch = () => {
        fetchPedidosExames();
    }

    return {pedidosExames, refetch};
};

export const FinalizaExameMedico = (exame_id) => {
    const [axios] = useAxiosWithTokenMedico()
    const path = API_PROTOCOL_HOSTNAME_PORT + "/api/medico/finalizar_exame";

    const finalizar = ({onSuccess, onError}) => {
        axios.put(path,
            {exame_id})
            .then(() => onSuccess()).catch(e => onError(e))
    }

    return {finalizar};
};
