<?php

require_once('flock.class.php');
require_once('Firewall.class.php');

$FireWallObj	= new Firewall();

$refused	= 0;
for($i = 0; $i < 400; $i++) {
	$ok		= $FireWallObj->isGranted();
	if (!$ok) {
		$refused++;
	#	echo	"$i is denied!\n";
	}
}

echo	"$refused accesses are denied!\n";

