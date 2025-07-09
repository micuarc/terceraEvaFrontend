import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

//componente de las evaluaciones agregadas, toma como prop las evaluaciones que se han añadido,
// que las maneja desde el componente princiapl
function ListaDeEvaluaciones({ evaluaciones, onEditar, onEliminar }) {
  //funcion para indicar cuál badge se aplicará según la nota del estudiante
  function escalaApreciacion(nota) {
    if (nota >= 6.5 && nota <= 7.0) {
      return (
        <Badge bg="success" className="rounded-pill my-1">
          Destacado
        </Badge>
      );
    }
    if (nota >= 5.6 && nota <= 6.4) {
      return (
        <Badge bg="primary" className="rounded-pill my-1">
          Buen trabajo
        </Badge>
      );
    }
    if (nota >= 4.0 && nota <= 5.5) {
      return (
        <Badge bg="warning" className="rounded-pill my-1">
          Con mejora
        </Badge>
      );
    }
    if (nota >= 1.0 && nota <= 3.9) {
      return (
        <Badge bg="danger" className="rounded-pill my-1">
          Deficiente
        </Badge>
      );
    }
    return null;
  }

  //se muestran las notas guardadas
  //si no hay evaluaciones, muestra un mensaje genérico
  //si hay estudiantes, muestra sus datos + botones para edición o eliminación
  return (
    <Container className="contenedor container-guardadas px-4 py-2 my-4 col-6 ">
      <h2 className="header editarEvaluacion fw-semibold fw-semibold text-center py-2 fs-5">
        Evaluaciones Guardadas
      </h2>
      {evaluaciones.length === 0 ? (
        <p>
          <i className="d-flex justify-content-center text-secondary">
            No hay evaluaciones guardadas. ¡Agrega una!
          </i>
        </p>
      ) : (
        evaluaciones.map((evaluacion, index) => (
          <div
            key={evaluacion.id}
            className="d-flex justify-content-between align-items-center border rounded px-4 py-3 my-2 mx-2 bg-secondary bg-opacity-10"
          >
            <div className="d-flex flex-column">
              <p className="fs-6 mb-0">
                <b>Alumno: {evaluacion.alumno}</b>
              </p>
              <p className="fs-6 mb-0">Asignatura: {evaluacion.asignatura}</p>
              <p className="fs-6 mb-0">
                Nota: <b>{evaluacion.nota.toFixed(1)}</b>
              </p>
              {escalaApreciacion(evaluacion.nota)}
            </div>

            <div className="d-flex flex-row gap-2">
              <Button
                variant="warning"
                size="sm"
                className="text-light px-3"
                onClick={() => onEditar(index)}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="text-light px-2"
                onClick={() => onEliminar(index)}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))
      )}
    </Container>
  );
}

export default ListaDeEvaluaciones;
