<?php

	$dbConf		= require('ip_limit.conf.php');
	$ipConnection	= mysql_connect($dbConf['host'], $dbConf['user'], $dbConf['pass']) or die('Could not connect to DB');
	mysql_select_db($dbConf['db'], $ipConnection);

	$sql	= sprintf("DELETE FROM iplimit WHERE ip = '%s' ", $_SERVER['REMOTE_ADDR']);
	mysql_query($sql, $ipConnection);
	echo	$sql;