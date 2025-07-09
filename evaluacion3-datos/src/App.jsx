import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
import Container from "react-bootstrap/Container";
import FormDeEvaluacion from "./FormDeEvaluacion";
import useLocalStorage from "./useLocalStorage";
import ListaDeEvaluaciones from "./ListaDeEvaluaciones";

//nuestro componente principal
function App() {
  //manejo de estados de las evaluaciones, ver si estamos editando, qué item estamos editando y cuáles son los valores
  //que queremos meter a la edición
  const [evaluaciones, setEvaluaciones] = useLocalStorage("evaluaciones", []);
  const [editar, setEditar] = useState(false);
  const [indexEdicion, setIndexEdicion] = useState(null);
  const [valoresEdicion, setValoresEdicion] = useState(null);

  //para crear el id por cada estudiante nuevo
  const obtenerSiguienteId = () => {
    const ultimoId = localStorage.getItem("ultimoId");
    const nuevoId = ultimoId ? parseInt(ultimoId) + 1 : 1;
    localStorage.setItem("ultimoId", nuevoId.toString());
    return nuevoId;
  };

  //se cambia el estado de edición para indicar que se modificará e informarlo a los otros componentes
  //para eso tomamos el index del elemento a editar y luego seteamos los valores que devuelve el componente
  const editarEvaluacion = (index) => {
    setIndexEdicion(index);
    setEditar(true);
    setValoresEdicion(evaluaciones[index]);
  };

  //misma lógica anterior, solo que a la inversa (revierte todo)
  const abortarEdicion = () => {
    setEditar(false);
    setIndexEdicion(null);
    setValoresEdicion(null);
  };

  //en caso de apretar el botón de guardado,
  const guardarEvaluacion = (evaluacioNueva) => {
    //si estamos editando y no creando una nueva evaluación
    if (editar && indexEdicion !== null) {
      //copaimso el array de evaluaciones anterior
      const nuevasEvaluaciones = [...evaluaciones];
      //modificamos la evaluación en concreto de esde nuevo array
      nuevasEvaluaciones[indexEdicion] = evaluacioNueva;
      //seteamos los nuevos valores
      setEvaluaciones(nuevasEvaluaciones);
      //reiniciamos la edición
      abortarEdicion();
    } else {
      //si estamos creando una nueva evaluación
      setEvaluaciones([
        ...evaluaciones,
        { ...evaluacioNueva, id: obtenerSiguienteId() },
      ]);
    }
  };

  //si eliminamos la evaluación
  const eliminarEvaluacion = (index) => {
    //buscamos el index de la evaluación a eliminar y lo filtramos (lo eliminamos)
    const nuevasEvaluaciones = evaluaciones.filter((_, i) => i !== index);
    //actualizamos
    setEvaluaciones(nuevasEvaluaciones);
    if (editar && index === indexEdicion) abortarEdicion();
  };

  //retornamos todos nuestros componentes
  return (
    <>
      <Container>
        <Container className="contenedor col-3">
          <h1 className="py-2 my-3 mx-0 fs-4 fw-bold text-center">
            Evaluación de Alumnos
          </h1>
        </Container>
        <FormDeEvaluacion
          guardarEvaluacion={guardarEvaluacion}
          editar={editar}
          valoresEdicion={valoresEdicion}
          abortarEdicion={abortarEdicion}
        />
        <ListaDeEvaluaciones
          evaluaciones={evaluaciones}
          onEditar={editarEvaluacion}
          onEliminar={eliminarEvaluacion}
        />
      </Container>
    </>
  );
}

export default App;
