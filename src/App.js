import React from "react";
import PageRoutes from "./components/Routes/PageRoutes";
import { useStateValue } from "./StateProvider";

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
