<h1 class="nombrePagina">Olvide Password</h1>
<p class="descripcionPagina">Restablece password escribiendo tu E-mail a continuacion:</p>

<form action="/olvide" method="POST" class="formulario">
    <div class="campo">
        <label for="email">E-mail</label>
        <input 
            type="email"
            name="email" 
            id="email"
            placeholder="Tu E-mail" 
            />
    </div>

    <input class="boton" type="submit" value="Enviar instrucciones">

</form>

    <div class="acciones">
        <a href="/">¿Ya tienes una cuenta? <br> <span> Inicia Sesión</span></a>
        <a href="/crear-cuenta"> ¿Aún no tienes una cuenta? <br> <span>Crear Cuenta</span> </a>
    </div>

