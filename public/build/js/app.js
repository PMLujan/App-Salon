let paso=1;const pasoInicial=1,pasoFinal=3;function iniciarApp(){mostrarSeccion(),botonesPaginador(),tabs(),paginaAnterior(),paginaSiguiente()}function mostrarSeccion(){const t=document.querySelector(".mostrar");t&&t.classList.remove("mostrar");document.querySelector("#paso-"+paso).classList.add("mostrar");const o=document.querySelector(".actual");o&&o.classList.remove("actual");document.querySelector(`[data-paso= "${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(t=>{t.addEventListener("click",(function(t){paso=t.target.dataset.paso,botonesPaginador(),mostrarSeccion()}))})}function botonesPaginador(){const t=document.getElementById("anterior"),o=document.getElementById("siguiente");1==paso?(t.classList.add("ocultar"),o.classList.remove("ocultar")):3==paso?(t.classList.remove("ocultar"),o.classList.add("ocultar")):(t.classList.remove("ocultar"),o.classList.remove("ocultar"))}function paginaAnterior(){document.getElementById("anterior").addEventListener("click",(function(){paso>=1&&(paso--,mostrarSeccion(),botonesPaginador())}))}function paginaSiguiente(){document.getElementById("siguiente").addEventListener("click",(function(){paso<=3&&(paso++,mostrarSeccion(),botonesPaginador())}))}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));