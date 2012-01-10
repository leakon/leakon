<?php

require_once('quan_ban_jiao.php');

$arrMap	= FullHalfChars::getMapping();

natsort($arrMap);
#	print_r($arr);

$arrRet	= array();


foreach ($arrMap as $full => $half) {

	$arrRet[]	= sprintf("\t\"%s\" => \"%s\",\t// dec:%s hex:0x%s", $full, addslashes($half), ord($half), dechex(ord($half)));

}

$str	= implode("\n", $arrRet);

file_put_contents('array_map.txt', $str);
