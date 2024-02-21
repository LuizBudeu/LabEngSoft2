import { useEffect, useState } from "react";
import axios from "axios";

export const SignIn = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        senha: '',
        nome: '',
        cpf: '',
        data_de_nascimento: '',
        genero: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
    })

    const createUser = () => {

    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

  return (
    <form action={createUser}>
        <label>Email:</label>
        <input name="email" />
        <input type="password" name="password"/>
        <input name="nome" />
        <input name="cpf" />
        <input name="data_de_nascimento" type="date" />
        <input name="genero" />
        <input name="cep" />
        <input name="logradouro" />
        <input name="numero" />
        <input name="complemento" />

        
        <button type="submit">Submit</button>
    </form>
  );
};
