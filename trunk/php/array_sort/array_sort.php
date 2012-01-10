<?php


function KeySort($a, $b) {
	if ($a == $b) {
		return 0;
	}
	return ($a < $b) ? -1 : 1;
}

function KeyRSort($a, $b) {
	if ($a == $b) {
		return 0;
	}
	return ($a < $b) ? 1 : -1;	// desc
}

function ValueSort($a, $b) {
	if ($a == $b) {
		return 0;
	}
	return ($a < $b) ? -1 : 1;
}

function ValueRSort($a, $b) {
	if ($a == $b) {
		return 0;
	}
	return ($a < $b) ? 1 : -1;	// desc
}

$arr	= array();
uasort($arr, 'ValueSort');
uksort($arr, 'KeySort');