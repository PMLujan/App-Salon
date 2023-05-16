let paso = 1;

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp(){
    tabs();
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
}
function tabs(){
    const botones = document.querySelectorAll('.tabs button');
          botones.forEach( boton => {
            boton.addEventListener('click', function(e){
                paso = (e.target.dataset.paso); // accedemos al valor de los atributos que creamos
                mostrarSeccion();
            })

          });
}