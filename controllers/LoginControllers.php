<?php

namespace Controllers;

use Classes\Emails;
use MVC\Router;
use Model\Usuario;


class LoginControllers {

    public static function login(Router $router){
        $alertas = [];

        $auth= new Usuario; //es para que mantenga la informacion  en el caso de recargar pag

        if($_SERVER['REQUEST_METHOD'] === 'POST'){

            $auth = new Usuario($_POST);

            $alertas = $auth->validarUsuario();

            if(empty($alertas)){
                //comprobar que existe usuario
                $usuario = Usuario::where('email',$auth->email);
                
                if($usuario){
                    //verificar password
                     if($usuario->comprobarPasswordVerificado($auth->password)){
                        //autenticar al usuario
                        session_start();//para habilitar la superglobal session

                        $_SESSION['id'] = $usuario->id;
                        $_SESSION['nombre'] = $usuario->nombre;
                        $_SESSION['email'] = $usuario->email;
                        $_SESSION['login'] = true;

                        //redireccionamos
                        if($usuario->admin === '1'){
                            $_SESSION['admin'] = $usuario->admin ?? null;

                            header('location: /admin');
                        }else{
                            header('location: /cita');
                        }

                     };
                }else{
                    Usuario::setAlerta('error','El Usuario no existe');
                }
            }
        }

        $alertas = Usuario::getAlertas();
        
        $router->render('auth/login',[
            'alertas'=> $alertas,
            'auth'=> $auth
        ]);
    }

    public static function logout(){
         echo 'Desde Logout';
    }

    public static function olvide( Router $router){
        $alertas =[];
     
        if($_SERVER['REQUEST_METHOD'] === 'POST'){

            $auth= new Usuario($_POST);
            $alertas = $auth->validarEmail();

            if(empty($alertas)){
                $usuario = Usuario::where('email', $auth->email);

                if($usuario && $usuario->confirmado === '1'){
                    //genero nuevo token
                    $usuario->crearToken();
                    $usuario->guardar();

                    //enviar mail
                    $email = new  Emails($usuario->email, $usuario->nombre , $usuario->token);
                    $email->enviarInstrucciones();

                    //print alerta
                    Usuario::setAlerta('exito' , 'Revisa tu E-mail');

                }else{
                    Usuario::setAlerta('error','El Usuario no existe o no esta confirmado');
                }
            }
        }

        $alertas = Usuario::getAlertas();

        $router->render('auth/olvide-password',[
            'alertas' => $alertas

        ]);
        
    }
    public static function recuperar( Router $router){

        $alertas =[];
        $error= false;//si el token no es valido no traiga el formulario para recuperar

        $token= S($_GET['token']);

        //buscar usuario por su token
        $usuario = Usuario::where('token', $token);

        if(empty($usuario)){
                Usuario::setAlerta('error', 'El token no es valido');
                $error= true;
        }

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            //leer la nueva password y guardarla

            $password = new Usuario($_POST);

            $alertas = $password->validarPassword();
            if(empty($alertas)){
                //modificamos a null el password actual
                $usuario->password = null;

                //le asignamos el nuevo valor del objeto password creado al arriba- al del usuario creado en la base de datos
                $usuario->password = $password->password;
                //hashear el nuevo password
                $usuario->hashPassword();
                //reseteamos el token
                $usuario->token=null;

                //guardamos nuevo password en la bd
                $resultado = $usuario->guardar();

                if($resultado){
                    header('location: /');
                }
            }
        }

        $alertas = Usuario::getAlertas();
        $router->render('auth/recuperar-password',[
            'alertas'=>$alertas,
            'error'=> $error
        ]);
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