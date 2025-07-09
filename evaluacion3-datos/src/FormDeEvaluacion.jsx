import React, { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

//validación del nombre
function validarNombre(nombre) {
  const valor = nombre.trim();
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
  if (valor === "") return `Por favor, ingrese el nombre del alumno.`;
  if (!regex.test(valor)) return `Por favor, ingrese solo letras.`;
  return "";
}

//validación de la nota
function validarNota(num) {
  const nota = parseFloat(num);
  if (num.trim() === "") return "Por favor, ingrese una nota.";
  if (isNaN(nota)) return "Por favor, ingrese solo números.";
  if (nota < 1 || nota > 7) return "Por favor, ingrese una nota válida.";
  if (!Number.isInteger(nota * 10))
    return "Por favor, ingrese notas con máximo un decimal";
  return "";
}

//no haremos validación de una asignatura ya que puede tener numeros y letras

//creamos el componente
function FormDeEvaluacion({
  editar,
  valoresEdicion,
  guardarEvaluacion,
  abortarEdicion,
}) {
  //asignamos los hook de state (getter y setter) con sus valores por defecto
  const [alumno, setAlumno] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [nota, setNota] = useState("");
  const [errores, setErrores] = useState({});

  //sincronizamos los valores con el componente app principal
  useEffect(() => {
    if (editar && valoresEdicion) {
      setAlumno(valoresEdicion.alumno);
      setAsignatura(valoresEdicion.asignatura);
      setNota(valoresEdicion.nota.toString());
      setErrores({});
    }
  }, [editar, valoresEdicion]);

  //se activa la validación que se hará enlos input si se encuentra algún error
  const validacionCampos = () => {
    const errorNombre = validarNombre(alumno);
    const errorNota = validarNota(nota);
    const erroresEncontrados = {
      alumno: errorNombre,
      nota: errorNota,
    };

    setErrores(erroresEncontrados);
    return !errorNombre && !errorNota;
  };

  //para manejar el submit (agregamos los valores al estado)
  const handleSubmit = (e) => {
    e.preventDefault();
    //si no se cumple la validación no aplica
    if (!validacionCampos()) return;

    //guardamos los valores para manejarlos en el componente principal
    guardarEvaluacion({ alumno, asignatura, nota: parseFloat(nota) });
    //al guardar un estudiante, se limpian los valors del input para agregar otro
    setAlumno("");
    setAsignatura("");
    setNota("");
    setErrores({});
  };

  //para manejar cambios en los input
  const handleChange = (campo) => (e) => {
    const value = e.target.value;

    if (campo === "alumno") setAlumno(value);
    else if (campo === "asignatura") setAsignatura(value);
    else if (campo === "nota") setNota(value);
  };

  //si se cambia del input actual, se advierte algún error en las validaciones
  const handleBlur = (campo) => () => {
    let error = "";
    if (campo === "alumno") error = validarNombre(alumno);
    else if (campo === "nota") error = validarNota(nota);
    setErrores((prev) => ({ ...prev, [campo]: error }));
  };

  //lo que muestra el front finalmente, el formulario
  //con control de campos si es edicion o adicion
  return (
    <>
      <Container className="contenedor container-agregar px-4 py-2 col-4">
        <h2 className="header editarEvaluacion fw-semibold text-center py-2 fs-5">
          {editar ? "Editar Evaluación" : "Agregar Nueva Evaluación"}
        </h2>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="formAlumno.nombreAlumno" className="my-1">
            <Form.Label htmlFor="nombreAlumno" className="my-1">
              Nombre del Alumno:
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Ej: Juan Pérez"
              value={alumno}
              onChange={handleChange("alumno")}
              onBlur={handleBlur("alumno")}
              isInvalid={!!errores.alumno}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errores.alumno}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formAlumno.asignaturaAlumno" className="my-1">
            <Form.Label htmlFor="asignaturaAlumno" className="my-1">
              Asignatura:
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Matemáticas"
              onChange={handleChange("asignatura")}
              value={asignatura}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-1" controlId="formAlumno.notaAlumno">
            <Form.Label htmlFor="notaAlumno" className="my-1">
              Nota (1.0 - 7.0):
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 5.5"
              step="0.1"
              min="1"
              max="7"
              value={nota}
              onChange={handleChange("nota")}
              onBlur={handleBlur("nota")}
              isInvalid={!!errores.nota}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errores.nota}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" className="col-12 my-2">
            {editar ? "Guardar Cambios" : "Agregar Evaluación"}
          </Button>
          {editar && (
            <Button
              variant="danger"
              onClick={abortarEdicion}
              className="col-12 my-2"
            >
              Cancelar Edición
            </Button>
          )}
        </Form>
      </Container>
    </>
  );
}

export default FormDeEvaluacion;
