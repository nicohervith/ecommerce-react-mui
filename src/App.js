import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Pages/navbar/Navbar";
import PageRoutes from "./components/PageRoutes";
import { useStateValue } from "./StateProvider"; // Asumiendo que aquí tienes tu StateProvider configurado

function App() {
  const [{ user }, dispatch] = useStateValue();
  console.log(user);

  return (
    <div className="App">
      <PageRoutes />
    </div>
  );
}

export default App;
