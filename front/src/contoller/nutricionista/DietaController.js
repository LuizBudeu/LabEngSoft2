import axios from "axios";
import { useState, useEffect } from "react";

export const GetDieta = (consulta_id) => {

    const [dieta, setDieta] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/nutricionista/dieta", {
            params: {
                appointment_id: consulta_id
            }
        },
        ).then((response) => {
            setDieta(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }, [consulta_id]);
};

export const SalvaDieta = async (dieta) => {

};