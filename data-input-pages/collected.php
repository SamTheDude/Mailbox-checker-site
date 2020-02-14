<?php

$PDO = new PDO('sqlite:../database/MailDatabase.db');

$statement = $PDO->prepare("INSERT INTO Collects (CollectDate) VALUES (CURRENT_TIMESTAMP);");

$statement->execute();

?>