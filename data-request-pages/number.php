<?php

$PDO = new PDO('sqlite:../database/MailDatabase.db');

$commands = array("SELECT * FROM Opens;", "SELECT * FROM Collects;");
$results = array(null, null);

for ($i=0; $i < 2; $i++) { 
    $statement = $PDO->prepare($commands[$i]);
    $statement->execute();
    $results[$i] = $statement->fetchAll();
}

//print_r($results);

$lastCollect = $results[1][0][1];

for ($i=0; $i < sizeof($results[1]); $i++) { 
    if($results[1][$i][1] > $lastCollect){
        $lastCollect = $results[1][$i][1];
    }
}

$opens = 0;

for ($i=0; $i < sizeof($results[0]); $i++) { 
    if($results[0][$i][1] > $lastCollect){
        $opens++;
    }
}

echo $opens;

?>