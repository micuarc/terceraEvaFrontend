import { useState } from "react";

//creamos un hook para manejar el localstorage
const useLocalStorage = (key, valorDefault) => {
  //empezamoscreamos un estado para almacenar el valor del localStorage
  const [valorLocalStorage, setValorLocalStorage] = useState(() => {
    const valor = localStorage.getItem(key);
    //si el valor ya existe en el localStorage se retorna
    if (valor) return JSON.parse(valor);
    //sino se seteara un default y se devuelve
    else {
      localStorage.setItem(key, JSON.stringify(valorDefault));
      return valorDefault;
    }
  });

  //actualizar el valor del localStorage y nuestro estado que lo almacena
  const setEstadoLocalStorage = (valorLocal) => {
    localStorage.setItem(key, JSON.stringify(valorLocal));
    setValorLocalStorage(valorLocal);
  };
  return [valorLocalStorage, setEstadoLocalStorage];
};
export default useLocalStorage;
