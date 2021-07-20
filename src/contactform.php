<?php

    if (isset($_POST['submit'])){
        $mailFrom = $_POST['mail'];
        $subject = $_POST['subject'];
        $message = $_POST['message'];
        $mailTo = "moulindesforges@orange.fr";
        $headers = "From : lemoulindesforges.fr";

        $txt = "Vous avez recu un email depuis votre site de :".$mailFrom."\n\n".$message;

        $envoi = mail($mailTo, $subject, $txt, $headers);

        header("Location : ../index.html");
    }


?>