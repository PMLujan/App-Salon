let paso=1;const pasoInicial=1,pasoFinal=3;function iniciarApp(){mostrarSeccion(),botonesPaginador(),tabs(),paginaAnterior(),paginaSiguiente(),consultarApi(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));let cita={nombre:"",fecha:"",hora:"",servicios:[]};function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");document.querySelector("#paso-"+paso).classList.add("mostrar");const t=document.querySelector(".actual");t&&t.classList.remove("actual");document.querySelector(`[data-paso= "${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){e.preventDefault(),paso=e.target.dataset.paso,mostrarSeccion(),botonesPaginador()}))})}function botonesPaginador(){const e=document.getElementById("anterior"),t=document.getElementById("siguiente");1==paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):3==paso?(e.classList.remove("ocultar"),t.classList.add("ocultar"),mostrarResumen()):(e.classList.remove("ocultar"),t.classList.remove("ocultar"))}function paginaAnterior(){document.getElementById("anterior").addEventListener("click",(function(){paso>=1&&(paso--,mostrarSeccion(),botonesPaginador())}))}function paginaSiguiente(){document.getElementById("siguiente").addEventListener("click",(function(){paso<=3&&(paso++,mostrarSeccion(),botonesPaginador())}))}async function consultarApi(){try{const e="http://localhost:3000/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:o,precio:n}=e,a=document.createElement("P");a.classList.add("nombreServicio"),a.textContent=o;const c=document.createElement("P");c.classList.add("precioServicio"),c.textContent="$"+n;const r=document.createElement("DIV");r.classList.add("servicio"),r.dataset.idServicios=t,r.onclick=function(){seleccionaServicio(e)},r.appendChild(a),r.appendChild(c),document.getElementById("servicios").appendChild(r)})}function seleccionaServicio(e){const{id:t}=e,{servicios:o}=cita,n=document.querySelector(`[data-id-servicios ="${t}"]`);o.some(e=>e.id===t)?(cita.servicios=o.filter(e=>e.id!==t),n.classList.remove("seleccionado")):(cita.servicios=[...o,e],n.classList.add("seleccionado"))}function nombreCliente(){const e=document.getElementById("nombre").value;cita.nombre=e}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();[6,0].includes(t)?(e.target.value="",mostrarAlerta("Sábados y domingos no permitidos","error",".formulario")):cita.fecha=e.target.value}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value.split(":")[0];t<10||t>18?(e.target.value="",mostrarAlerta("Hora no Válida","error",".formulario")):cita.hora=e.target.value}))}function mostrarAlerta(e,t,o,n=!0){const a=document.querySelector(".alerta");a&&a.remove();const c=document.createElement("DIV");c.textContent=e,c.classList.add("alerta"),c.classList.add(t);document.querySelector(o).appendChild(c),n&&setTimeout(()=>{c.remove()},3e3)}function mostrarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0==cita.servicios.length)return void mostrarAlerta("Faltan datos de Servicios, Fecha u Hora","error",".contenido-resumen",!1);const t=document.createElement("H3");t.textContent="Resumen de Cita y Servicios a realizar",e.appendChild(t);const{nombre:o,fecha:n,hora:a,servicios:c}=cita;let r=document.createElement("P");r.innerHTML="<span>Nombre:</span> "+o;const i=new Date(n),s=i.getMonth(),d=i.getDate()+2,l=i.getFullYear(),u=new Date(Date.UTC(l,s,d)).toLocaleDateString("es-AR",{weekday:"long",year:"numeric",month:"long",day:"numeric"});let m=document.createElement("P");m.innerHTML="<span>Fecha:</span> "+u;let p=document.createElement("P");p.innerHTML=`<span>Hora:</span> ${a} Hs`;const v=document.createElement("BUTTON");v.classList.add("boton"),v.textContent="Reservar Cita",v.onclick=reservarCita,e.appendChild(r),e.appendChild(m),e.appendChild(p),e.appendChild(v),c.forEach(t=>{const{id:o,nombre:n,precio:a}=t,c=document.createElement("DIV");c.classList.add("contenedorServicio");const r=document.createElement("P");r.textContent=n;const i=document.createElement("P");i.innerHTML=`<span>Precio: $${a} </span>`,c.appendChild(r),c.appendChild(i),e.appendChild(c)})}async function reservarCita(){const{nombre:e,fecha:t,hora:o,servicios:n}=cita,a=n.map(e=>e.id),c=new FormData;c.append("nombre",e),c.append("fecha",t),c.append("hora",o),c.append("servicios",a);const r=await fetch("http://localhost:3000/api/cita",{method:"POST",body:c}),i=await r.json();console.log(i)}