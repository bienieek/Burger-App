<?php

$json = file_get_contents("php://input");
$body = json_decode($json);

file_put_contents("png/" . time() . '.png' , base64_decode($body->png));

?>