import { useEffect, useState } from "react";
import { useAuth, useAxiosWithToken, useIsLoggedIn, useLogout } from "tarifacao-lib";

const TARIFACAO_LOGIN_URL = import.meta.env.VITE_TARIFACAO_LOGIN_URL

function App() {
  useAuth();
  const loggedIn = useIsLoggedIn();
  const logout = useLogout();
  const axios = useAxiosWithToken();
  const [clientDisplayData, setClientDisplayData] = useState({});

  useEffect(() => {
    if (loggedIn)
      axios.get('/tarifacao/cliente').then(response => setClientDisplayData(response.data));
  }, [loggedIn])

  if (loggedIn) return (
    <>
      <p>Você está logado.</p>
      <button onClick={logout}>Logout</button>
      <p>Início da contagem: {clientDisplayData.countStart}</p>
      <p>Valor acumulado desde o início da contagem: R${clientDisplayData.accumulatedPrice}</p>
      <p>Preço por requisição: R${clientDisplayData.pricePerRequest}</p>
    </>
  )

  return (
    <>
      <p>Bem vindo ao portal de tarifagem</p>
      <a href={TARIFACAO_LOGIN_URL}>Fazer Login</a>
    </>
  )
}

export default App
