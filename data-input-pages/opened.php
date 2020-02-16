<?php

$db = new SQLite3('../database/MailDatabase.db');

$db->query('INSERT INTO Opens (OpenDate) VALUES (CURRENT_TIMESTAMP);');

?>