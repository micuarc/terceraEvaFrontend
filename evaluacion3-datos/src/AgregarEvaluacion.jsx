import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function AgregarEvaluacion() {
  const [estudiante, setEstudiante] = useState({});

  return (
    <>
      <Container className="contenedor contenedor-titulo col-3">
        <h1 className="py-2 my-3 fs-4 fw-bold text-center">
          Evaluación de Alumnos
        </h1>
      </Container>
      <Container className="contenedor container-agregar px-4 py-2 col-4">
        <h2 className="header editarEvaluacion fw-semibold text-center py-2 fs-5">
          Agregar Nueva Evaluación
        </h2>
        <Form>
          <Form.Group className="mb-3" controlId="formAlumno.nombreAlumno">
            <Form.Label htmlFor="nombreAlumno">Nombre del Alumno:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Juan Pérez"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAlumno.asignaturaAlumno">
            <Form.Label htmlFor="asignaturaAlumno">Asignatura:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Matemáticas"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAlumno.notaAlumno">
            <Form.Label htmlFor="notaAlumno">Promedio (1.0 - 7.0):</Form.Label>
            <Form.Control type="number" placeholder="Ej: 5.5"></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="col-12 my-2">
            Agregar Evaluación
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default AgregarEvaluacion;
