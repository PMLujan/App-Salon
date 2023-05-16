<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App Salón</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;700;900&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" href="build/css/app.css">
</head>
<body>
    <div class="contenidoApp">
        <div class="imagen"></div>
        <div class="app">
            <?php echo $contenido; ?>
        </div>
    </div>
            
</body>
</html>

<?php
    echo $script ?? ''; // le colocamos las comillas para que no nos arroje error si no esta definido
?>