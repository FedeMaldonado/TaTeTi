const o = "✖"; //jugador1
const x = "Ｏ"; //jugador2
//Estilos de simbolos (𝓞,✘),(Ｏ,✖)

//Creo una variable para llevar la cuenta y saber de quien es el turno de jugar
//Segun como este el estado del juego se va a escribir X u O.
let estadoDelJuego = "✘";

const modal = document.querySelector("dialog"); //Referencia al modal
const textoModal = modal.querySelector("h2"); // dentro del modal busco el h2.

//Cuadrados ya no es mas una coleccion, pasa a ser un Array.
const cuadrados = Array.from(document.querySelectorAll(".cuadrado"));

cuadrados.forEach((cuadrado, i) => {
  cuadrado.addEventListener("click", () => {
    //Cuando el jugador gana, el estado de juego queda en pausa y se termina la ejecución.
    if (estadoDelJuego === "PAUSA") return;
    if (cuadrado.textContent !== "") return; //Si el cuadrado es distinto al vacio, es decir que ya tiene un valor(simbolo), no se puede cambiar.
    cuadrado.innerHTML = estadoDelJuego === "✘" ? x : o; //Escribo los simbolos
    estadoDelJuego = estadoDelJuego === "✘" ? "𝓞" : "✘"; //Altero el turno del jugador
    //Al revisar si hay un ganador, lo guardo en posicionGanadora.
    const posicionGanadora = revisarSihayGanador(); //Despues de hacer click en cada uno de los cuadrados, la funcion se ejecuta
    //Si el tipo de la posicion ganadora es igual al objeto, es decir que no es falso ni tampoco empate, alguien gano
    if (typeof posicionGanadora === "object") {
      ganar(posicionGanadora); //Llamo a la funcion ganar y mando la posicion ganadora.
      return;
    }
    if (posicionGanadora === "empate") {
      mostrarModal("Empate");
    }
  });
});

//Creo una funcion para verificar si alguien gano
function revisarSihayGanador() {
  //Creo un arreglo desde cuadrados que es quien tiene la coleccion de todos los cuadrados.
  const tablero = cuadrados.map((cuadrado) => cuadrado.innerHTML);
  console.log(tablero);

  //REVISAR HORIZONTALES
  //Recorro los cuadrados e incremento de 3 en 3
  for (let i = 0; i <= 9; i += 3) {
    //Si el indice 0 del tablero es igual al indice 1 y 2 hay un ganador
    if (
      tablero[i] && //Primero verifico que el cuadrado inicial( indice 0) este completo
      tablero[i] === tablero[i + 1] &&
      tablero[i] === tablero[i + 2]
    ) {
      return ganar([i, i + 1, i + 2]); //Retorno la posicion ganadora
    }
  }

  //REVISAR VERTICALES
  //Recorro los cuadrados e incremento de 1 en 1
  for (let i = 0; i <= 3; i++) {
    //Si el indice 0 del tablero es igual al indice 1 y 2 hay un ganador
    if (
      tablero[i] && //Primero verifico que el cuadrado inicial( indice 0) este completo
      tablero[i] === tablero[i + 3] &&
      tablero[i] === tablero[i + 6]
    ) {
      return ganar([i, i + 3, i + 6]); //Retorno la posicion ganadora
    }
  }

  //REVISAR DIAGONALES
  //Si el indice 0 del tablero es igual al indice 1 y 2 hay un ganador
  if (
    tablero[0] && //Primero verifico que el cuadrado inicial( indice 0) este completo
    tablero[0] === tablero[4] &&
    tablero[0] === tablero[8]
  ) {
    return ganar([0, 4, 8]); //Retorno la posicion ganadora
  }

  if (
    tablero[2] && //Primero verifico que el cuadrado inicial( indice 0) este completo
    tablero[2] === tablero[4] &&
    tablero[2] === tablero[6]
  ) {
    return ganar([2, 4, 6]); //Retorno la posicion ganadora
  }

  //Si el arreglo del tablero incluye un string vacio, todavia queda por jugar.
  if (tablero.includes("")) return false;
  return "empate";

  //Creo una funcion para ver quien es el ganador del juego
  //Creo una variable para guardar  la posicion ganadora
  function ganar(posicionGanadora) {
    console.log("Ganador " + posicionGanadora);
    //Asigno la clase ganador a los elementos que tengo en la lista de las posiciones ganadoras.
    posicionGanadora.forEach((posicion) => {
      //Selecciono los cuadrados en la posicion que se gano
      cuadrados[posicion].classList.toggle("ganador", true);
      //(class.List.toggle) lo que hace es desactivar y activar clases, cuando halla un ganador la clase ganador queda en true y se pinta en verde.
    });
    mostrarModal("Ganador : " + estadoDelJuego);
    estadoDelJuego = "PAUSA";
  }
}

//Creo la funcion para la ventana emergente
function mostrarModal(texto) {
  textoModal.innerHTML = texto;
  modal.showModal();
}

//Selecciono el boton de reiniciar
modal.querySelector("button").addEventListener("click", () => {
  cuadrados.forEach((cuadrado) => {
    cuadrado.innerHTML = "";
    cuadrado.classList.toggle("ganador", false);
    modal.close(); //Cierro el modal, es decir la ventana emergente.
    estadoDelJuego = "Jugador1"; //Vuelve al estado inicial del juego
  });
});
