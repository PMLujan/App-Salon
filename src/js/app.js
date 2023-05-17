let paso = 1;
const pasoInicial=1;
const pasoFinal=3;

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp(){
    mostrarSeccion();// para q se muestre la primer ventana 
    botonesPaginador();//oculta los botones segun la seccion
    tabs();//cambia la seccion al precionar en el tab
    paginaAnterior();
    paginaSiguiente();
}

function mostrarSeccion(){
    //ocultar la clase de mostrar
    const seccionMostrar= document.querySelector('.mostrar');
          if(seccionMostrar){
            seccionMostrar.classList.remove('mostrar');
          }

    //seleccionar la seccion con el paso
    const pasoSelector = document.querySelector(`#paso-${paso}`);
          pasoSelector.classList.add('mostrar');

    //si tiene la clse actual eleminar para poser seleccionar otra
    const seccionActual = document.querySelector('.actual');
          if(seccionActual){
            seccionActual.classList.remove('actual');
          }
    //cambiar color de la ventana actual
    const tab = document.querySelector(`[data-paso= "${paso}"]`);
          tab.classList.add('actual');
}


function tabs(){
    const botones = document.querySelectorAll('.tabs button');
          botones.forEach( boton => {
            boton.addEventListener('click', function(e){
                paso = (e.target.dataset.paso); // accedemos al valor de los atributos que creamos
                botonesPaginador();// para que funcione tmb al cambiar seccion
                mostrarSeccion();
            })
          });
}

function botonesPaginador(){
     const botonAnterior= document.getElementById('anterior');
     const botonSiguiente= document.getElementById('siguiente');

     if(paso == 1){
      botonAnterior.classList.add('ocultar');
      botonSiguiente.classList.remove('ocultar');
     } else if( paso == 3 ) {
       botonAnterior.classList.remove('ocultar');
       botonSiguiente.classList.add('ocultar');
     }else{
      botonAnterior.classList.remove('ocultar');
      botonSiguiente.classList.remove('ocultar');
     }
}

function paginaAnterior(){
        const paginaAnterior= document.getElementById('anterior');
              paginaAnterior.addEventListener('click' , function(){
                 if(paso >= pasoInicial){
                  paso--;
                  mostrarSeccion();
                  botonesPaginador();
                 }
              })

}
function paginaSiguiente(){
  const paginaSiguiente= document.getElementById('siguiente');
              paginaSiguiente.addEventListener('click' , function(){
                 if(paso <= pasoFinal){
                  paso++;
                  mostrarSeccion();
                  botonesPaginador();
                 }
              })

}