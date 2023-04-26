
<h1 class="nombrePagina">Crear cuenta</h1>
<p class="descripcionPagina">Llena el siguiente formulario con tus datos para crear una cuenta</p>

<?php
    @include_once __DIR__ . "./../templates/alertas.php";
?> 

<form class="formulario" action="/crear-cuenta" method="post">
    <div class="campo">
        <label for="nombre">Nombre</label>
        <input 
            type="text"
            name="nombre" 
            id="nombre"
            placeholder="Tu Nombre"
            value  = "<?php echo s ($usuario->nombre) ; ?>"
             />
    </div>
    <div class="campo">
        <label for="apellido">Apellido</label>
        <input 
            type="text"
            name="apellido" 
            id="apellido"
            placeholder="Tu Apellido"
            value = "<?php echo s($usuario->apellido); ?>"
             />
    </div>
    <div class="campo">
        <label for="telefono">Teléfono</label>
        <input 
            type="tel"
            name="telefono" 
            id="telefono"
            placeholder="Tu Teléfono"
            value = "<?php echo s($usuario->telefono); ?>"
             />
    </div>
    <div class="campo">
        <label for="email">E-mail</label>
        <input 
            type="email"
            name="email" 
            id="email"
            placeholder="Tu E-mail" 
            />
    </div>
    <div class="campo">
        <label for="password">Password</label>
        <input 
            type="password"
            name="password" 
            id="password"
            placeholder="Tu Password" 
            />
    </div>

    <input class="boton" type="submit" value="Crear Cuenta" >

</form>
    <div class="acciones">
        <a href="/">¿Ya tienes una cuenta? <br> <span> Inicia Sesión</span></a>
        <a href="/olvide"> ¿Olvidaste tu password? </a>
    </div>
