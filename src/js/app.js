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
    consultarApi();// consultar la API EN EL BACKEND DE php
    nombreCliente();// añade nombre al objeto de cita
    seleccionarFecha();
}

//se va a completar cuando seleccione una cita 
let cita={
      nombre:'',
      fecha:'',
      hora:'',
      servicios: []
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

async function consultarApi(){
      try {
        const url = 'http://localhost:3000/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);

      } catch (error) {
        console.log(error);
      }
}

function mostrarServicios(servicios){
       servicios.forEach( servicio => {

           const {id,nombre,precio} = servicio;

           const nombreServicio = document.createElement('P');
                 nombreServicio.classList.add('nombreServicio');
                 nombreServicio.textContent =nombre;
           const precioServicio = document.createElement('P');
                 precioServicio.classList.add('precioServicio');
                 precioServicio.textContent = `$${precio}`;
           const divServicios = document.createElement('DIV');
                 divServicios.classList.add('servicio');
                 divServicios.dataset.idServicios = id; //debe ir en M la s para que separe el dataset
                 divServicios.onclick = function(){
                              seleccionaServicio(servicio);
                 }
          
          divServicios.appendChild(nombreServicio);
          divServicios.appendChild(precioServicio);

          document.getElementById('servicios').appendChild(divServicios);

       })
}


function seleccionaServicio(servicio){
      const {id} = servicio; // tomo el valor del id para pasarlo al selector
      const {servicios} = cita;  //extraigo la clave servicios [] destructuring


      //identifico el elemento al que doy click
      const divServicios= document.querySelector(`[data-id-servicios ="${id}"]`);

      //comprobar que el servicio ya fue seleccionado
      if( servicios.some( agregadoServicio => agregadoServicio.id === id)){//comparo lo que esta en memoria con lo seleccionado
            //eliminarlo
            cita.servicios = servicios.filter( servicio => servicio.id !== id ); //saca un elemento del array segun una condicion
            divServicios.classList.remove('seleccionado');//eliminar clase
      }else{
           //agregarlo
           cita.servicios = [...servicios,servicio]; //tomo una copia de los servicios y lo agregro el nuevo servicio
           divServicios.classList.add('seleccionado'); //agregar clase
      }
      console.log(cita);
}

function nombreCliente(){
      const nombre= document.getElementById('nombre').value;
            cita.nombre= nombre;
}

function seleccionarFecha(){
      const inputFecha = document.querySelector('#fecha');
            inputFecha.addEventListener('input', function (e){
                  const dia = new Date(e.target.value).getUTCDay();// nueva instancia de date para chequear el dia seleccionado
                  if([6,0].includes(dia)){
                        e.target.value= ''; //para que no deje seleccionar sabado y domingo
                        mostrarAlerta('Sábados y domingos no permitidos','error');
                  }else{
                        cita.fecha = e.target.value;
                        console.log(cita);
                  }
            })
}

function mostrarAlerta(mensaje,tipo){
      //previene que se genere mas de una alerta 
      const alertaPrevia= document.querySelector('.alerta');
            if(alertaPrevia) return;// detiene la ejecucion del codigo
      
      //script para generar la alerta
      const alerta = document.createElement('DIV');
            alerta.textContent= mensaje;
            alerta.classList.add('alerta');
            alerta.classList.add(tipo);
      const formulario=document.querySelector('.formulario');
            formulario.appendChild(alerta);
            
      //elminar alerta 
      setTimeout(() => {
            alerta.remove();
      }, 3000);
}