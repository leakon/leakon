<?php

$array	= array(
	'Hello World',
	123,
	10.26
);

$format	= "String: %s, Int: %d, Float: %f";

echo	vsprintf($format, $array);
