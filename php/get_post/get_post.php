<?php

echo	"[" . $_SERVER['REMOTE_ADDR'] . "]\n[" . strtoupper($_SERVER['REQUEST_METHOD']) . "]";

if (!empty($_POST)) {

	print_r($_POST);

} else {

	echo	"NULL";
}

