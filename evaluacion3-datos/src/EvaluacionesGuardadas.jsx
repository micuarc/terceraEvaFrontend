import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function EvaluacionesGuardadas() {
  return (
    <>
      <Container className="contenedor container-guardadas col-5">
        <h2 className="header editarEvaluacion fw-semibold text-center py-2 fs-5 my-3">
          Evaluaciones Guardadas
        </h2>
      </Container>
    </>
  );
}

export default EvaluacionesGuardadas;
