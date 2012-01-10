<?php

date_default_timezone_set( 'PRC' );
header("Content-Type: text/html; charset=UTF-8");

define('IS_MAGIC_QUOTE',	get_magic_quotes_gpc());





function get_video_resource($html_content) {

	$html_content	= html_entity_decode($html_content);

#	$regexObjectHtml	= "/value\s*=\s*[\'\"]?((\<|&lt;)object[^\'\"]+)[\'\"]?/i";


	$regexObjectHtml	= "/value\s*=\s*[\'\"]?(\<object.*?\<\/object\>)/i";

	preg_match_all($regexObjectHtml, $html_content, $arrMatches);

	$videoObjectHtml	= $arrMatches[1][0];

	$videoObjectHtml	= html_entity_decode($videoObjectHtml);

#	var_dump($videoObjectHtml);
	$regexVideoUrl		= "/value\s*=\s*[\'\"]?(http[^\'\"\s]+)[\'\"]?/i";
#	$regexVideoUrl		= "/value\s*=\s*[\'\"]?(http[^\'\"\s]+)[\'\"]?/i";

	preg_match_all($regexVideoUrl, $videoObjectHtml, $arrMatches);
#	var_dump($regexVideoUrl);

	return	$arrMatches[1][0];


}


function pr($arr) {
	echo	'<pre style="font-family:Verdana; font-size:14px;">';
	print_r($arr);
	echo	'</pre>';
}








