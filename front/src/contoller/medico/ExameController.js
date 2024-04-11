import {useEffect, useState} from "react";
import {API_PROTOCOL_HOSTNAME_PORT} from "../../utils/utils";
import {useAxiosWithToken} from "../../utils/useAxiosWithToken";
import {useSearchParams} from "react-router-dom";

// export const PedirExameMedico = async (paciente_id, titulo) => {
//     const [axios] = useAxiosWithToken();
//     const [searchParams] = useSearchParams();
//     const medico_id = searchParams.get("id");
//
//     try {
//         const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/medico/pedir_exame", {
//             paciente_id,
//             medico_id,
//             titulo
//         });
//
//         if (response.status != 200) {
//             console.log("Resposta da criação", response.data);
//             return false;
//         }
//
//         return true;
//     } catch (e) {
//         console.log("Erro na criação", e);
//         return false;
//     }
// };

export const PedirExameMedico = (paciente_id, titulo) => {
    const [axios] = useAxiosWithToken();
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
    const [axios] = useAxiosWithToken();

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

    return [pedidosExames, refetch];
};

export const FinalizaExameMedico = async (exame_id) => {
    const [axios] = useAxiosWithToken()

    try {
        const response = await axios.put(API_PROTOCOL_HOSTNAME_PORT + "/api/medico/finaliza_exame", {exame_id});

        if (response.status != 200) {
            console.log("Resposta da finalização", response.data);
            return false;
        }

        return true;
    } catch (e) {
        console.log("Erro na finalização", e);
        return false;
    }
};
