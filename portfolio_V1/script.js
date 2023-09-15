let turno = 0;
let numCasillero = 0;
let jugador = [' O ', ' X '];
let estadojuego = jugador[turno];

let mostrarMensaje = document.querySelector('#mensaje');
const casilleros = document.querySelectorAll('#casilla');
const reinicio = document.querySelector('#reset');

casilleros.forEach(casillas=>{casillas.addEventListener('click',function(){
    if(estadojuego === "pausa")
    return;

    if (casillas.textContent !== "")
    return;

    numCasillero +=1;

    if (turno === 1){
        turno-=1;
        casillas.innerText = jugador[turno];
        mostrarMensaje.innerText = 'TURNO DEL JUGADOR X';
    }
    else if (turno === 0){
        turno+=1;
        casillas.innerText = jugador[turno];
        mostrarMensaje.innerText = 'TURNO DEL JUGADOR O';

    }
    const posicionGanadora = chequearVictorias();

    if(typeof posicionGanadora === "object"){
        ganar(posicionGanadora);
        return
    }
    })
})
function chequearVictorias(){
    const grilla = Array.from(casilleros).map(casilla => casilla.textContent);
    for(i = 0;i <= 9; i +=3){
        //comprobar horizontales
        if (grilla[i] &&
            grilla[i] === grilla[i+1] && 
            grilla[i] === grilla[i+2]){
            mostrarMensaje.innerHTML = "GANÓ EL JUGADOR: " + jugador[turno]; 
            return ganar([i,i+1,i+2]);
        }
    }
    for(i = 0; i <=3 ; i++){
        //comprobar verticales
        if (grilla[i] && 
            grilla[i] === grilla[i+3] && 
            grilla[i] === grilla[i+6]){
            mostrarMensaje.innerHTML = "GANÓ EL JUGADOR: " + jugador[turno];
            return ganar([i,i+3,i+6]);
        }
    }
    //comprobar diagonales
    if (grilla[0] && 
        grilla[0] === grilla[4] && 
        grilla[0] === grilla[8]){
        mostrarMensaje.innerHTML = "GANÓ EL JUGADOR: " + jugador[turno];
        return ganar([0,4,8]);
    }
    if (grilla[6] && 
        grilla[6] === grilla[4] &&  
        grilla[6] === grilla[2]){
        mostrarMensaje.innerHTML = "GANÓ EL JUGADOR: " + jugador[turno];
        return ganar([6,4,2]);
    }
    // Verificar empate
    if (!grilla.includes("") && typeof posicionGanadora === "undefined"){
            mostrarMensaje.innerHTML = "HAY EMPATE";
            mostrarBoton();
            return "empate";
    }
}
function ganar(posicionGanadora){
    estadojuego = "pausa";
    posicionGanadora.forEach(posicion => {
    casilleros[posicion].classList.toggle('ganador',true);

    mostrarBoton();
    })
  }
function mostrarBoton(){
   document.querySelector('#reset').style.display = 'block';
    reinicio.addEventListener('click',reset);
    function reset() {
        casilleros.forEach(casilla => {
            if (casilla.textContent !== "") {
                casilla.innerText = "";
                }
            });
        estadojuego = jugador[turno];
        mostrarMensaje.innerHTML = '';
        casilleros.forEach(casilla => {
         casilla.classList.toggle('ganador',false);
        });
        reinicio.style.display ='none';
    }
}