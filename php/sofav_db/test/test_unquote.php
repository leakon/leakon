<?php

require_once(dirname(__FILE__) . '/require_all.php');

$arr		= array(

	'1234',
	'"',
	"''",
	'efe'	=> array(
			'3123412',
			'""',
			'\%'
		),

);

print_r($arr);

print_r("\n--------------------\n");

$res	= deepQuote($arr);
print_r($res);
print_r("\n--------------------\n");

$res	= SofavDB_Manager::unQuote($res);
print_r($res);

print_r("\n--------------------\n");

$md5['before']	= md5(serialize($arr));
$md5['after']	= md5(serialize($res));

printf("Before	%s\nAfter	%s\n", $md5['before'], $md5['after']);

var_dump($md5['before'] == $md5['after']);

function deepQuote($mixedVar) {

	$retVar		= NULL;

	if (is_array($mixedVar)) {
		foreach ($mixedVar as $key => $val) {
			$retVar[$key]	= deepQuote($val);
		}
	} else {
		$retVar	= addslashes($mixedVar);
	}

	return	$retVar;

}
