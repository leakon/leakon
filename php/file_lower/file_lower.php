<?php

/**
 * 1.	Give a path
 * 2.	All file under the path will be converted to lowercase letter
 * 3.	Please make a new dir and put all target files into the new dir
 * Liulikang (http://www.leakon.com)
 * 2007-12-11
 */

$strDir		= $argv[1];
$dirPath	= realpath($strDir);

if (false == $dirPath) {
	die('Please specify a directory!');
}

function ChangeCase($str) {
	return	mb_strtolower($str);
//	return	mb_strtoupper($str);
}

function HandleFile($file) {

	$file	= trim($file);

	if (preg_match("/.*?\.{1,2}$/i", $file)) {
	//	echo	"FILE: $file \n";
		return	0;
	}

	if (file_exists($file)) {
		$content	= file_get_contents($file);
		$content	= ChangeCase($content);
		return		file_put_contents($file, $content);
	}
	return	0;
}

$handle		= opendir($dirPath);
if ($handle) {
	echo "Files:\n";

	while (false !== ($file = readdir($handle))) {

		$targetFile	= $dirPath . '/' . $file;

		$ret		= HandleFile($targetFile);

		if ($ret) {
			echo	"Process $targetFile Success!\n";
		}

	}
	closedir($handle);
}
