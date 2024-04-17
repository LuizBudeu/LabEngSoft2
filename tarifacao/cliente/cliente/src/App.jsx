import { useEffect, useState } from "react";
import { useAuth, useAxiosWithToken, useIsLoggedIn, useLogout } from "tarifacao-lib";

function App() {
  useAuth();
  const loggedIn = useIsLoggedIn();
  const logout = useLogout();
  const axios = useAxiosWithToken();
  const [clientDisplayData, setClientDisplayData] = useState({});

  useEffect(() => {
    axios.get('/tarifacao/cliente').then(response => setClientDisplayData(response.data));
  }, [])

  if (loggedIn) return (
    <>
      <p>Você está logado.</p>
      <button onClick={logout}>Logout</button>
      <p>Valor acumulado deste mês: {clientDisplayData.acumuladoMesAtual}</p>
      <p>Valor do último mês: {clientDisplayData.acumuladoMesPassado}</p>
      <p>Preço por requisição: {clientDisplayData.precoPorRequisicao}</p>
    </>
  )

  return (
    <>
      <p>Bem vindo ao portal de tarifagem</p>
      <a href=''>Fazer Login</a>
    </>
  )
}

export default App
