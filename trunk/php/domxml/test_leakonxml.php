<?php

header("Content-Type: text/html; charset=UTF-8");

require_once('require.php');


$arrFiles	= array();
$arrFiles[1]	= 'opera6.html';
$arrFiles[2]	= 'iebookmark_utf8.html';
$arrFiles[3]	= 'GoogleBookmarks.html';
$arrFiles[4]	= 'firefoxbookmarks.html';
$arrFiles[5]	= 'firefoxbookmarks0.html';
$arrFiles[6]	= 'delicious-20080215-162722.html';

#var_dump(date('Y-m-d H:i:s'));
foreach ($arrFiles as $file) {
#	testFile($file);
}
#var_dump(date('Y-m-d H:i:s'));


testFile_IE($arrFiles[2]);


function testFile_IE($file) {

	$content	= file_get_contents($file);

	$dom		= new LeakonXML();

	$content	= mb_convert_encoding($content, 'UTF-8', 'GBK');

	$dom->loadString($content);

	$strTags	= $dom->getTags();

	pr($strTags);

#	$domTree	= $dom->getDom();


#	$res		= explode("\n", $strTags);

#	pr($res);

#	$testTags	= $dom->testTags();

#	var_dump($file);
#	var_dump(md5(trim($strTags)));
#	var_dump(md5(trim($testTags)));

}



function testFile($file) {

	$content	= file_get_contents($file);

	$dom		= new LeakonXML();

#	$content	= mb_convert_encoding($content, 'UTF-8', 'GBK');

	$dom->loadString($content);

	$strTags	= $dom->getTags();

	$testTags	= $dom->testTags();

	var_dump($file);
	var_dump(md5(trim($strTags)));
	var_dump(md5(trim($testTags)));

}
