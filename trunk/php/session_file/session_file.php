<?php

ini_set("display_errors",1);
error_reporting(E_ALL);

session_start();

$data	= date("Y-m-d H:i:s");
echo	$data;


/*
echo	"<br />";
$sid	= md5(uniqid(rand()));
session_id($sid);

echo	session_id($sid);

$_SESSION['data']	= $data;
*/


?>

<p>
<a href="">Test</a>
</p>


