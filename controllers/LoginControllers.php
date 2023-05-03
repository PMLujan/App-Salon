<?php

namespace Controllers;

use Classes\Emails;
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

            if(empty($alertas)){
                //comprobar que el usuario no existe
                $resultado= $usuario->existeUsuario();

                if($resultado->num_rows){
                    $alertas = Usuario::getAlertas();
                }else{
                    //hashear password
                    $usuario->hashPassword();

                    //crear token
                    $usuario->crearToken();

                    //enviar email para confirmacion
                    $email = new Emails ($usuario->email,$usuario->nombre,$usuario->token);

                    $email->enviarConfirmacion();

                    //crear usuario
                    $resultado= $usuario->guardar();

                    if($resultado){
                        header('location:/mensaje');
                    }

                }

            }      
        }

        $router->render('auth/crear-cuenta' , [
            'usuario'=>$usuario,
            'alertas'=>$alertas
        ]);
    }

    public static function confirmar( Router $router){
        $alertas=[];

        $token= s($_GET['token']);

        $usuario= Usuario::where('token',$token);

        if(empty($usuario)){
            //mostrar mensaje de error
            Usuario::setAlerta('error','Token no valido');

        }else{
            //modificar usuario confirmado
            $usuario->confirmado= '1';
            $usuario->token = null;
            $usuario->guardar();
            Usuario::setAlerta('exito','Cuenta confirmada!');
        }
        //obtener alertas
        $alertas= Usuario::getAlertas();

        //renderizar la vista
        $router->render('auth/confirmar-cuenta', [
            'alertas'=>$alertas
        ]);
        
    }

    public static function mensaje( Router $router){
            $router->render('auth/mensaje');
    }


}
    
?>