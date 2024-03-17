import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import { Login } from "./interface/login";
import { Home } from "./interface/home";
import { NavBar } from "./components/navbar";
import { SignIn } from "./components/signin";
import { PacienteHome } from "./interface/paciente/home";
import { MedicoHome } from "./interface/medico/home";
import { PreparadorHome } from "./interface/preparador/preparadorHome";

function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/paciente" element={<PacienteHome/>}/>
      <Route path="/preparador" element={<PreparadorHome />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
