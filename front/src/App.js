import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PacienteHome } from "./interface/paciente/home";
import { MedicoHome } from "./interface/medico/home";
import { PreparadorHome } from "./interface/preparador/home";
import { NutricionistaHome } from "./interface/nutricionista/home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/paciente" element={<PacienteHome />} />
                <Route path="/preparador" element={<PreparadorHome />} />
                <Route path="/medico" element={<MedicoHome />} />
                <Route path="/nutricionista" element={<NutricionistaHome />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
