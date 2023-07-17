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
    seleccionarFecha();//añade fecha a cita
    seleccionarHora();//añade hora a cita
    mostrarResumen();// mostrar el resumen de citas
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
                e.preventDefault();
                paso = (e.target.dataset.paso); // accedemos al valor de los atributos que creamos
                mostrarSeccion();
                botonesPaginador();// para que funcione tmb al cambiar seccion - tmb ejecuta mostrarResumen
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
       mostrarResumen();
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
                        mostrarAlerta('Sábados y domingos no permitidos','error','.formulario');
                  }else{
                        cita.fecha = e.target.value;
                  }
            })
}

function seleccionarHora(){
      const inputHora=document.querySelector('#hora');
            inputHora.addEventListener('input',function(e){
                  const hora= e.target.value;
                  const horaCita= hora.split(":")[0]; // split:separa string de hora en una array de dos string -> posicion [0] para evaluar
                        if(horaCita < 10 || horaCita > 18){
                              e.target.value= ''; //para que no deje seleccionar hora no valida
                              mostrarAlerta('Hora no Válida', 'error','.formulario');
                        }else{
                              cita.hora = e.target.value;
                        }
            })
}

function mostrarAlerta(mensaje,tipo, elemento, desaparece = true){
      //previene que se genere mas de una alerta 
      const alertaPrevia= document.querySelector('.alerta');
            if(alertaPrevia){
                  alertaPrevia.remove();//eliminamos la alerta que
            };
      
      //script para generar la alerta
      const alerta = document.createElement('DIV');
            alerta.textContent= mensaje;
            alerta.classList.add('alerta');
            alerta.classList.add(tipo);
      const referencia =document.querySelector(elemento);
            referencia.appendChild(alerta);
            
      //elminar alerta 
      if(desaparece){
      setTimeout(() => {
            alerta.remove();
      }, 3000);
   }
}

function mostrarResumen(){
      const resumen= document.querySelector('.contenido-resumen');

      //limpiar resumen
      while( resumen.firstChild){
            resumen.removeChild(resumen.firstChild);
      }

            if( Object.values(cita).includes('') || cita.servicios.length == 0){
                  mostrarAlerta('Faltan datos de Servicios, Fecha u Hora', 'error', '.contenido-resumen', false);

                  return; // detener la ejecucion del codigo
            }
      //crear titulo
      const tituloResumen= document.createElement('H3');
            tituloResumen.textContent='Resumen de Cita y Servicios a realizar';
            resumen.appendChild(tituloResumen);

      //formatear div de resumen
      const {nombre,fecha,hora,servicios} = cita;
            let nombreCliente = document.createElement('P');
                  nombreCliente.innerHTML =`<span>Nombre:</span> ${nombre}`;
      //formatear fecha 
            const fechaObj= new Date(fecha);
            const mes= fechaObj.getMonth();
            const dia= fechaObj.getDate() + 2; //porque arroja un dia antes y al instanciar dos veces nos devuelve dos dias antes
            const año =fechaObj.getFullYear();
     
            const fechaUTC= new Date( Date.UTC(año,mes,dia));
           // en español
           const opciones = { weekday: 'long' , year: 'numeric' , month: 'long' , day:'numeric'};
           const fechaFormateada= fechaUTC.toLocaleDateString('es-AR' , opciones); //no modifica los datos originales del objeto cita solo los muestra en un formato mas amigable
           

            let fechaCliente = document.createElement('P');
                  fechaCliente.innerHTML =`<span>Fecha:</span> ${fechaFormateada}`;
            let horaCliente = document.createElement('P');
                  horaCliente.innerHTML =`<span>Hora:</span> ${hora} Hs`;

                  resumen.appendChild(nombreCliente);
                  resumen.appendChild(fechaCliente);
                  resumen.appendChild(horaCliente);

                  //iterar en servicios para obtener los datos
                  servicios.forEach( servicio => {
                       const{id,nombre,precio}= servicio;
               
                        const contenedorServicio= document.createElement('DIV');
                              contenedorServicio.classList.add('contenedorServicio');
                        const nombreServicio= document.createElement('P');
                              nombreServicio.textContent = nombre;
                        const precioServicio= document.createElement('P');
                              precioServicio.innerHTML= `<span>Precio: $${precio} </span>`;

                              contenedorServicio.appendChild(nombreServicio);
                              contenedorServicio.appendChild(precioServicio);
                              resumen.appendChild(contenedorServicio);
                              
                  })
            }  
            