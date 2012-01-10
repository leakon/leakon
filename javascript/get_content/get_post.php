<?php

$strFileName	= 'post/' . date('Ymd_His') . '_' . rand(100, 999) . '.txt';
$fp		= fopen($strFileName, 'w+');

fwrite($fp, $_REQUEST['content']);