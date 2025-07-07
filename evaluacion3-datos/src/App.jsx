import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
import Container from "react-bootstrap/Container";
import AgregarEvaluacion from "./AgregarEvaluacion";
import EvaluacionesGuardadas from "./EvaluacionesGuardadas";

function App() {
  return (
    <>
      <Container>
        <AgregarEvaluacion />
        <EvaluacionesGuardadas />
      </Container>
    </>
  );
}

export default App;
