import React from 'react';
// import HelloWorld from './HelloWorld';

import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./components/login";
import {Home} from "./components/home";
// import {Navigation} from ".components/navigation"
// import {Logout} from './component/logout';

function App() {
  return (
    <BrowserRouter>
    {/* <Navigation></Navigation> */}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;



// function App() { 
//      return 
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home/>}/>
//           <Route path="/login" element={<Login/>}/>
//         </Routes>
//       </BrowserRouter>;
// }
// export default App;