import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Pages/navbar/Navbar";
import PageRoutes from "./components/PageRoutes";
import { useStateValue } from "./StateProvider"; // Asumiendo que aquí tienes tu StateProvider configurado

function App() {
  const [{ user }, dispatch] = useStateValue();
  console.log(user);
  const location = useLocation();

  useEffect(() => {
    const checkLocalStorageUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        dispatch({
          type: "SET_USER",
          user: parsedUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    };

    checkLocalStorageUser();
  }, []);

  return (
    <div className="App">
      {location.pathname !== "/signin" && location.pathname !== "/signup" && (
        <Navbar />
      )}
      <PageRoutes />
    </div>
  );
}

export default App;
