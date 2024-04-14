import { useAuth, useIsLoggedIn } from "tarifacao-lib";

function App() {
  useAuth();
  const loggedIn = useIsLoggedIn();

  if (loggedIn) return (
    <></>
  )

  return (
    <>
      <p>Bem vindo ao portal de tarifagem</p>
      <a href='1.1.1.1'></a>
    </>
  )
}

export default App
