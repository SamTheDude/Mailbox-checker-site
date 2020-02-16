<?php

$db = new SQLite3('../database/MailDatabase.db');

$db->query('INSERT INTO Collects (CollectDate) VALUES (CURRENT_TIMESTAMP);');

?>