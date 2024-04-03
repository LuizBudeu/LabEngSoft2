import { useEffect, useState } from "react";
import { API_PROTOCOL_HOSTNAME_PORT } from "../../utils/utils";
import { useAxiosWithToken } from "../../utils/useAxiosWithToken";
import axios from "axios";

export const PedirExameMedico = async (paciente_id, medico_id, titulo) => {
  try {
    const response = await axios.post(
      API_PROTOCOL_HOSTNAME_PORT + "/api/medico/pedir_exame",
      { paciente_id, medico_id, titulo }
    );

    if (response.status != 200) {
      console.log("Resposta da criação", response.data);
      return false;
    }

    return true;
  } catch (e) {
    console.log("Erro na criação", e);
    return false;
  }
};

export const GetPedidosExames = (user_id) => {
  const [pedidosExames, setPedidosExames] = useState([]);

  useEffect(() => {
    axios
      .get(API_PROTOCOL_HOSTNAME_PORT + "/api/medico/pegar_exames", {
        params: {
          user_id: user_id,
        },
      })
      .then((response) => {
        setPedidosExames(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user_id]);

  return [pedidosExames, setPedidosExames];
};

export const FinalizaExameMedico = async (exame_id, axios) => {
  try {
    const response = await axios.put(
      API_PROTOCOL_HOSTNAME_PORT + "/api/medico/finaliza_exame",
      { exame_id }
    );

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
