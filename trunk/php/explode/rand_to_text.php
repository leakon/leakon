<?php

require_once('explode.inc.php');

$strContent	= '';

for($i = 0; $i < DATA_COUNT; $i++ ) {

	$arrLines	= array();

	for($j = 0; $j < 1000; $j++) {

		$arrLines[]	= dechex(rand(0, 9999990));

	}

	$strContent	.= implode(',', $arrLines) . "\n";

}


$fp	= fopen(DATA_FILE, 'w+');
fwrite($fp, $strContent);
