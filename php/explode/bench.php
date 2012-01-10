<?php

require_once('explode.inc.php');

$GLOBALS['sum_temp']	= array();
$arrLines		= file(DATA_FILE);

function sumLine(&$strLine) {

	$GLOBALS['sum_temp']	= array();
	$GLOBALS['sum_temp']	= explode(',', $strLine);

	$startIndex		= rand(0, 700);
	$stopPos		= $startIndex + 100;

	$total			= 0;
	for($i = $startIndex; $i < $stopPos; $i++) {
		$total	+= hexdec($GLOBALS['sum_temp'][$i]);
	}

	return	$total;
}

echo	"start:\t" . date("Y-m-d H:i:s") . "\n";

$arrResult	= array();
foreach($arrLines as $lines) {

	$tmp		= array();

	for($i = 0; $i < 6; $i++) {
		$tmp[]	= sumLine($lines);
	}

	for($i = 0; $i < 6; $i++) {
		$tmp[]	= $tmp[ $i + 1 ] * 1.0 / $tmp[ $i ];
		$i++;
	}

	$arrResult[]	= implode("\t", $tmp);
}

echo	"stop:\t" . date("Y-m-d H:i:s") . "\n";

$fp	= fopen(RESULT_FILE, 'w+');
fwrite($fp, implode("\n", $arrResult));
