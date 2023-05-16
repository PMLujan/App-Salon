<?php 

require_once __DIR__ . '/../includes/app.php';

use Controllers\CitasControllers;
use Controllers\LoginControllers;
use MVC\Router;

$router = new Router();

//iniciar sesion
$router->get('/', [LoginControllers::class, 'login']);
$router->post('/', [LoginControllers::class, 'login']);
$router->get('/logout', [LoginControllers::class, 'logout']);

//recuperar pasword
$router->get('/olvide', [LoginControllers::class, 'olvide']);
$router->post('/olvide', [LoginControllers::class, 'olvide']);
$router->get('/recuperar', [LoginControllers::class, 'recuperar']);
$router->post('/recuperar', [LoginControllers::class, 'recuperar']);

//crear cuenta
$router->get('/crear-cuenta', [LoginControllers::class, 'crear']);
$router->post('/crear-cuenta', [LoginControllers::class, 'crear']);

//confirmar cuenta
$router->get('/confirmar-cuenta', [LoginControllers::class,'confirmar']);
$router->get('/mensaje', [LoginControllers::class,'mensaje']);

//area privada
$router->get('/cita', [CitasControllers::class , 'index']);


// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();