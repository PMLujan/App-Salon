<?php

namespace Controllers;

use MVC\Router;
use Model\Usuario;


class LoginControllers {

    public static function login(Router $router){
        $router->render('auth/login');
    }

    public static function logout(){
         echo 'Desde Logout';
    }

    public static function olvide( Router $router){
        $router->render('auth/olvide-password',[

        ]);
        
    }
    public static function recuperar(){
        echo 'Desde Recuperar';
    }
    
    public static function crear( Router $router){

        $usuario = new Usuario;
        //alerta de errores vacia
        $alertas=[];

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            
            $usuario->sincronizar($_POST);

            $alertas = $usuario->validarCuentaNueva();
       
        }

        $router->render('auth/crear-cuenta' , [
            'usuario'=>$usuario,
            'alertas'=>$alertas
        ]);
    }


}
    
?>