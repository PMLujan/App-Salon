<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Emails {

    public $email;
    public $nombre;
    public $token;

    public function __construct($email,$nombre,$token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token =$token;
    }

    public function enviarConfirmacion(){
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = '42f496248deb81';
        $mail->Password = '51e24b91215544';

        $mail->setFrom('cuentas@appsalon.com');//se coloca el correo o dominio que compres
        $mail->addAddress('cuentas@appsalon.com', 'AppSalon.com');
        $mail->Subject ='Confirma tu cuenta';

        $mail->isHTML(TRUE);
        $mail->CharSet= "UTF-8";

        $contenido="<html>";
        $contenido .= "<p><strong> Hola ". $this->nombre ."! </strong> Has creado tu cuenta en App Salon, solo debes confirmar tu correo en el siguente enlace</p>";
        $contenido .= "<p>Presiona aquí: <a href='http://localhost:3000/confirmar-cuenta?token=". $this->token . "'> Confirmar cuenta </a> </p>";
        $contenido.= "<p>Si tu no solicitaste esta cuenta puedes ignorar este mensaje.</p>";
        $contenido .= "</html>";
        
        $mail->Body=$contenido;

        // ENVIAR MAIL
        $mail->send();
    }

    public function enviarInstrucciones(){
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = '42f496248deb81';
        $mail->Password = '51e24b91215544';

        $mail->setFrom('cuentas@appsalon.com');//se coloca el correo o dominio que compres
        $mail->addAddress('cuentas@appsalon.com', 'AppSalon.com');
        $mail->Subject ='Restablece tu password';

        $mail->isHTML(TRUE);
        $mail->CharSet= "UTF-8";

        $contenido="<html>";
        $contenido .= "<p><strong> Hola ". $this->nombre ."! </strong> Has solicitado restablecer tu password, sigue al siguiente enlace para restablecerla.</p>";
        $contenido .= "<p>Presiona aquí: <a href='http://localhost:3000/recuperar?token=". $this->token . "'> Reestablecer Password</a></p>";
        $contenido.= "<p>Si tu no solicitaste esta cambio, puedes ignorar este mensaje.</p>";
        $contenido .= "</html>";
        $mail->Body=$contenido;

        // ENVIAR MAIL
        $mail->send();

    }
}

?>