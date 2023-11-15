import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from "./components/Signup";
import Home from "./components/Home";
import Signin from "./components/Signin";

function App() {
  return (
    <BrowserRouter>
      <div style={{display:'flex',justifyContent:'center', alignItems:'center', margin:'auto'}}>
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Signin' element={<Signin />} />
      
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;