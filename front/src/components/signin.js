import { useEffect, useState } from "react";
import { CustomSelect } from "../components/customSelect";
import { GenderOptions } from "../utils/options";

import axios from "axios";
import { API_PROTOCOL_HOSTNAME_PORT } from "../utils/utils";

const obligatoryFields = {
    email: true,
    senha: true,
    nome: true,
    cpf: true,
    data_de_nascimento: true,
    genero: false,
    cep: false,
    logradouro: false,
    numero: false,
    complemento: false,
};

export const SignIn = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        senha: "",
        nome: "",
        cpf: "",
        data_de_nascimento: "",
        genero: 0,
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        ocupacao: 0, // Paciente
    });

    // Create user
    const submit = async (e) => {
        e.preventDefault();
        const response = await axios.post(API_PROTOCOL_HOSTNAME_PORT + "/api/usuario/create/", formValues);
        console.log(response);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <form onSubmit={submit}>
            <label>Email {obligatoryFields["email"] ? "*" : ""}: </label>
            <input name="email" onChange={handleChange} />
            <br />

            <label>Password {obligatoryFields["senha"] ? "*" : ""}: </label>
            <input type="password" name="senha" onChange={handleChange} />
            <br />

            <label>Nome {obligatoryFields["nome"] ? "*" : ""}: </label>
            <input name="nome" onChange={handleChange} />
            <br />

            <label>CPF {obligatoryFields["cpf"] ? "*" : ""}: </label>
            <input name="cpf" onChange={handleChange} />
            <br />

            <label>Data de nascimento {obligatoryFields["data_de_nascimento"] ? "*" : ""}: </label>
            <input name="data_de_nascimento" type="date" onChange={handleChange} />
            <br />

            <label>Genero {obligatoryFields["genero"] ? "*" : ""}: </label>
            <CustomSelect list={GenderOptions} value={obligatoryFields["genero"] ? "*" : ""} onChange={handleChange} />
            <br />

            <label>CEP {obligatoryFields["cep"] ? "*" : ""}: </label>
            <input name="cep" onChange={handleChange} />
            <br />

            <label>Logradouro {obligatoryFields["logradouro"] ? "*" : ""}: </label>
            <input name="logradouro" onChange={handleChange} />
            <br />

            <label>Numero da residência {obligatoryFields["numero"] ? "*" : ""}: </label>
            <input name="numero" onChange={handleChange} />
            <br />

            <label>Complemento {obligatoryFields["complemento"] ? "*" : ""}: </label>
            <input name="complemento" onChange={handleChange} />
            <br />

            <button type="submit">Submit</button>
        </form>
    );
};
