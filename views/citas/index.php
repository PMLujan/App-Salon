<h1 class="nombrePagina">Crear Nueva Cita</h1>
<p class="descripcionPagina">Elige tus servicios a continuacion</p>

<div id="app" >
    <nav class="tabs">
        <button class="actual" type="button" data-paso="1">Servicios</button>
        <button type="button" data-paso="2">Información Cita</button>
        <button type="button" data-paso="3">Resumen</button>
    </nav>

    <div id="paso-1" class="seccion">
        <h2>Servicios</h2>
        <p>Seleccióna lo que quieres realizarte:</p>
        <div id="servicios"  class="listadoServicios"></div>
    </div>

    <div id="paso-2" class="seccion">
        <h2>Tus datos y cita</h2>
        <p>Coloca tus datos y la fecha de la cita</p>
            <form class="formulario">
                <div class="campo">
                    <label for="nombre">Nombre</label>
                    <input 
                        id="nombre" 
                        type="text"
                        placeholder="Tu Nombre"
                        value= "<?php echo $nombre ;?>"
                        disabled 
                    />
                </div>
                <div class="campo">
                    <label for="fecha">Fecha</label>
                    <input 
                        id="fecha" 
                        type="date"
                    />
                </div>
                <div class="campo">
                    <label for="hora">Hora</label>
                    <input 
                        id="hota" 
                        type="time"
                    />
                </div>
            </form>
    </div>

    <div id="paso-3" class="seccion">
        <h2>Resumen</h2>
        <p>Verifica que la información sea correcta</p>     
    </div>

    <div class="paginacion">
        <button id="anterior" class="boton">
            &laquo; Anterior
        </button>
        <button id="siguiente" class="boton">
            &raquo; Siguiente
        </button>

    </div>
    
</div>

<?php
     $script = "<script src='./build/js/app.js'></script>";
?>