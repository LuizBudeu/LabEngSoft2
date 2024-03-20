import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {

  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(process.env.PROTOCOL_HOSTNAME_PORT + "/api/home/")
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="form-signin mt-5 text-center">
      <h1>Bem vindo a Center Fit. Faça o Login ou Sign In</h1>
      <h3>{message}</h3>
    </div>
  );
};
