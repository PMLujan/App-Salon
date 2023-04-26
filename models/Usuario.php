<?php

namespace Model;

use Model\ActiveRecord;

class Usuario extends ActiveRecord {

    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id' ,'nombre' , 'apellido','email','password' ,'telefono','admin','confirmado','token'];

    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $password;
    public $telefono;
    public $admin;
    public $confirmado;
    public $token;

    public function __construct( $args =[]){

        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->admin = $args['admin'] ?? null;
        $this->confirmado = $args['confirmado'] ?? null;
        $this->token = $args['token'] ?? '';        
    }
     
    //mensaje de validacion para la creacion de cuenta

    public function validarCuentaNueva(){

        if(!$this->nombre){
            self::$alertas['error'][] = "El Nombre del cliente es obligatorio";
        }
        if(!$this->apellido){
            self::$alertas['error'][] = "El Apellido del cliente es obligatorio";
        }

        return self::$alertas;
    }
}
?>