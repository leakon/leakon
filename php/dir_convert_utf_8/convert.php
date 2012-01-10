<?php

require_once(dirname(__FILE__) . '/SimpleDirectory.class.php');


$dir		= isset($argv[1]) ? $argv[1] : '';

$worker		= new SimpleDirectory($dir);

$worker->addType(array('php', 'html', 'htm', 'inc', 'txt', 'js', 'css', 'sql', 'xml'));

$arrFiles	= $worker->getFiles();

foreach ($arrFiles as $fileName) {

	if (!file_exists($fileName)) {
		continue;
	}

	$sizeBefore	= 0;
	$sizeAfter	= 0;

	if (1) {

		$content	= file_get_contents($fileName);
		$sizeBefore	= strlen($content);

		$content	= mb_convert_encoding($content, 'UTF-8', 'GBK');

		$sizeAfter	= file_put_contents($fileName, $content);

	}

	echo	sprintf("\n[%d - %d]	%s", $sizeBefore, $sizeAfter, $fileName);


}


echo	"\n";
