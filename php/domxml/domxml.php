<?php

require_once 'XML/Parser/Simple.php';

class myParser extends XML_Parser_Simple
{
    function myParser()
    {
       $this->XML_Parser_Simple();
     }

   function handleElement($name, $attribs, $data)
    {
    	print_r(array($name, $attribs, $data));
   //     printf("handle %s\n", $name);
    }
}

$content	= file_get_contents("GoogleBookmarks.html");

//$content	= mb_convert_encoding($content, "GBK", "UTF-8");

#$content	= mb_convert_encoding($content, "GBK");

$content	= str_replace("\r\n", "\n", $content);


$content	= preg_replace("/<DD>((.|[\r\n])*?)(<\/?D)/i", "<DD>\$1</DD>\$3", $content);



$content	= str_replace("<DL><p>", "<DL>", $content);
$content	= str_replace("</DL><p>", "</DL>", $content);

#$content	= str_replace("</DL>", "", $content);
$content	= str_replace("</A>", "</A></DT>", $content);
$content	= str_replace("</H3>", "</H3></DT>", $content);


$content	= str_replace("\n", "", $content);


//echo	$content;
//exit;



$p = &new myParser();

#$result = $p->setInputFile('GoogleBookmarks.html');
$result = $p->setInputString($content);
//$result = $p->parse();
//exit;



$p = xml_parser_create();
xml_parse_into_struct($p, $content, $vals, $index);
xml_parser_free($p);

if (0) {
	echo "Index array\n";
	print_r($index);
	echo "\nVals array\n";
	print_r($vals);

	exit;
}

require_once('parser_php5.php');

$xmlParser	= new XMLParser($content);
$xmlParser->Parse();

//echo	count($xmlParser->document->tagChildren[2]->tagChildren);
//print_r($xmlParser->document);

$domTree	= $xmlParser->document;


// DL Node

//$nodeOfDL	= $domTree->tagChildren

$res2		= GetElementsByTagName('dl', $domTree);

print_r($res2);


function GetElementsByTagName($tagName, $node) {

	$tagName	= strtolower($tagName);
	$res		= array();

	if ($tagName == $node->tagName) {

		$arr	= array(
		//	'attr'	=> $node->tagAttrs,
		//	'data'	=> $node->tagData,
			'data'	=> $node->tagChildren[0]->tagChildren[0]->tagData,
		);

		$res[]	= $arr;

	}

	if ($node->tagChildren) {

		foreach($node->tagChildren as $childNode) {

			$res	= array_merge($res, GetElementsByTagName($tagName, $childNode));

		}

	}

	return	$res;

}