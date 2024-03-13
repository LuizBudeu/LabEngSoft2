import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import { Login } from "./interface/login";
import { Home } from "./interface/home";
import { Perfil } from "./interface/paciente/perfil";
import { NavBar } from "./components/navbar";
import { SignIn } from "./components/signin";
import { EditPerfil } from "./interface/paciente/perfil_edit";
import { MedicoHome } from "./interface/medico/home";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/paciente/perfil" element={<Perfil />} />
                <Route path="/paciente/perfil/edit" element={<EditPerfil />} />
                <Route path="/medico" element={<MedicoHome />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
