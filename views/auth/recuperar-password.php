<h1 class="nombrePagina">Recuperar Password</h1>
<P class="descripcionPagina">Coloca tu nuevo Password:</P>

<?php
    @include_once __DIR__ . "./../templates/alertas.php";
?> 

<?php if($error) return; ?> <!-- si el token es invalido no muestra el formulario -->

<form class="formulario" method="POST"><!--no coloco action porque estoy reciviendo el token por url -->
<div class="campo">
        <label for="password">Password</label>
        <input 
                type="password" 
                id="password"
                placeholder="Tu nuevo Password"
                name="password"
        />
    </div>

    <input class="boton" type="submit" value="Enviar">

</form>

    <div class="acciones">
        <a href="/crear-cuenta">¿Aún no tienes una cuenta? <br><span>Crear cuenta</span> </a>
        <a href="/"> ¿Ya tienes Cuenta? <br> <span>Iniciar Sesión</span></a>
    </div>
