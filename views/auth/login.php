<h1 class="nombrePagina">Login</h1>
<p class="descripcionPagina">Inicia Sesión con tus Datos</p> <!-- las clases estan en tipografia-->

<form class="formulario" method="post" action="/">
    <div class="campo">
        <label for="email">E-mail</label>
        <input 
                type="email"
                id="email"
                placeholder="Tu E-mail"
                name="email"
        />
    </div>
    <div class="campo">
        <label for="password">Password</label>
        <input 
                type="password" 
                id="password"
                placeholder="Tu Password"
                name="password"
        />
    </div>
    <input class="boton" type="submit" value="Iniciar Sesión">

    <div class="acciones">
        <a href="/crear-cuenta">¿Aún no tienes una cuenta? <span> Crear cuenta</span> </a>
        <a href="/olvide"> ¿Olvidaste tu password? </a>
    </div>


</form>