<?php

require_once('require.php');

$p	= new BookmarkParser();

$file	= "opera6.html";
$file	= "delicious-20080215-162722.html";
$file	= "iebookmark.html";

$file	= "iebookmark.html";
$file	= "GoogleBookmarks.html";
$file	= "firefoxbookmarks.html";

$p->setInputFile($file);


$p->parse();
$html	= $p->dumpContent();


//echo	$html;

$res	= $p->getResult();
pr($res);

#pr($p->getBookmark());

/*
$xmlParser	= new XMLParser($html);
$xmlParser->Parse();
$domTree	= $xmlParser->document;


*/
