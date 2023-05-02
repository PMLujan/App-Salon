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
            self::$alertas['error'][] = "El Nombre es obligatorio";
        }
        if(!$this->apellido){
            self::$alertas['error'][] = "El Apellido es obligatorio";
        }
        if(!$this->telefono){
            self::$alertas['error'][] = "El Teléfono es obligatorio";
        }
        if(!$this->email){
            self::$alertas['error'][] = "El E-mail es obligatorio";
        }
        if(!$this->password){
            self::$alertas['error'][] = "El Password es obligatorio";
        }
        if( strlen($this->password) < 6 ){
            self::$alertas['error'][] = "El Password debe contener al menos 6 caracteres";
        }
        return self::$alertas;
    }

    public function existeUsuario(){
        $query = "SELECT * FROM " . self::$tabla . " WHERE email = '" . $this->email . "' LIMIT 1";
        
        $resultado = self::$db->query($query);

        if($resultado->num_rows){
            self::$alertas['error'][]= "El Usuario ya existe";
        }
        return $resultado;
    }

    public function hashPassword(){
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }
    public function crearToken(){
        $this->token =uniqid();
    }
}
?>