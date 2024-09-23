import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./NavBar";
import BarraProg from "./BarraProg";

import Formulario from "./Formulario";
import Timer from "./Timer";
import PasswordGenerator from "./PassWordGenerator/PassWordGenerator";
import RickAndMorty from "./RickAndMorty";

function App() {
  return (
    <div>
      <div>
        <NavBar />
        <br />
        <NavBar reverse={true} />
      </div>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: "20px",
          padding: "20px",
          spacebetween: "20px",
          gap: "30px",
        }}
      >
        <BarraProg />
        <Formulario />
        <Timer />
      </div>
      <PasswordGenerator />
      <RickAndMorty />
    </div>
  );
}

export default App;
