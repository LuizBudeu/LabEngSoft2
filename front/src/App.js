import React from "react";
import HelloWorld from "./HelloWorld";

import './App.css';
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import { Login } from "./interface/login";
import { Home } from "./interface/home";
import { Perfil } from "./interface/paciente/perfil";
import { NavBar } from "./components/navbar"
import { SignIn } from "./components/signin";

// function App() {
//   return (
//     <Home></Home>
//   );
// }

function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/paciente/perfil" element={<Perfil/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
