<?php

namespace Controllers;

use MVC\Router;

class CitasControllers {

    public static function index(Router $router){

        session_start(); // iniciamos session
        $nombre = $_SESSION['nombre'];

        // debuguear($nombre);

        $router->render('citas/index', [
            'nombre'=> $nombre 
        ]);
    }
}
?>