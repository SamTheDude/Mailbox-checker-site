<?php

$db = new SQLite3('../database/MailDatabase.db');

$results = array();

$results[0] = $db->query('SELECT * FROM Opens;');
$results[0] = $results[0]->fetchArray();

$results[1] = $db->query('SELECT * FROM Collects;');
$results[1] = $results[1]->fetchArray();

print_r($results . "/n");

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
