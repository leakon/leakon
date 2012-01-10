<?php

date_default_timezone_set('PRC');

require_once('smart_download.php');
require_once('ip_limit.php');

function downloadFile($baseDir = './', $field = 'file') {

	$submittedPath	= preg_replace('/\.+\//', '', urldecode($_REQUEST[$field]));

	$filePath	= realpath($baseDir . $submittedPath);

	if (!$filePath) {
		header('HTTP/1.1 404 Not Found');
		exit;
	}

	$obj = new SmartDownload($filePath);
	$obj->download();
	return true;
}


if (IpLimit::applyIP()) {
	// if granted access
	downloadFile();
} else {
	// else send 404 code
	header('HTTP/1.1 404 Not Found');
	exit;
}