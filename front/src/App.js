import React from "react";
import HelloWorld from "./HelloWorld";

import './App.css';
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import { Login } from "./components/login";
import { Home } from "./components/home";
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
    </Routes>
  </BrowserRouter>
  );
}

export default App;
