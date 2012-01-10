<?php

require_once('flock.php');


$conf	= array(
	'server_count'	=> 32,
	'data_file'	=> 'data.txt',
);

$serviceObj	= new IdService($conf);

for($i = 0; $i < 10000; $i++) {

	$id	= $serviceObj->getId();

}
