<?php
ignore_user_abort(1);
require_once('ip_limit.php');

if (IpLimit::applyIP()) {
//	register_shutdown_function('IpLimitShutdown');
	echo	'sleep';
	sleep(20);
	if (connection_aborted()) {
//		IpLimitShutdown();
	}
//	IpLimitShutdown();
} else {
	echo	'<a href="down.php?file=24.rmvb">download</a>';
}

