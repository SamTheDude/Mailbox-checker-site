<?php

$db = new SQLite3('../database/MailDatabase.db');

$result = array();

$result[0] = $db->query('SELECT * FROM Opens;');

$result[1] = $db->query('SELECT * FROM Collects;');

$results = array();

for ($i=0; $i < 2; $i++) { 
    $results[$i] = array();
    while($row = $result[$i]->fetchArray()) {
      array_push($results[$i], $row);
   }
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
