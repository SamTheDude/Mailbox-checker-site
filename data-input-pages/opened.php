<?php

$PDO = new PDO('sqlite:../database/MailDatabase.db');

$statement = $PDO->prepare("INSERT INTO Opens (OpenDate) VALUES (CURRENT_TIMESTAMP);");

$statement->execute();

?>