<?php

require_once('quan_ban_jiao.php');


$arrWords	= array(
	'《Ｈａｏ１２３教学》',
	'“ｓｈｕａｎｇ”，奇怪的双引号＂',
	'‘ｄａｎ’，奇怪的单引号＇',
	"'ＭＰ３",
	'Ｔ恤',
	'ＭＰ３下载',
	'福州寿山石',
);

foreach (FullHalf::getMapping() as $fullWord => $half) {
	$arrWords[]	= $fullWord;
}




foreach ($arrWords as $word) {

	$half	= SafeFullToHalf($word);
	$baidu	= getWordFromBaidu($word);


	$md5_1	= md5($half);
	$md5_2	= md5($baidu);
	$match	= intval($md5_1 == $md5_2);


	if (!$match) {
		echo	"\n---------------------------\n";
		echo	sprintf("word\t%s\n", $word);
		echo	sprintf("half\t%s\n", $half);
		echo	sprintf("baidu\t%s\n", $baidu);
		echo	sprintf("md51\t%s\n", $md5_1);
		echo	sprintf("md52\t%s\n", $md5_2);
		echo	sprintf("match\t%d\n", $match);
	}

}


#getWordFromBaidu('《Ｈａｏ１２３教学》');

function getWordFromBaidu($word) {


	$url	= sprintf("http://www.baidu.com/s?ie=gb2312&bs=a&sr=&z=&cl=3&f=8&wd=%s&ct=0", $word);

	$cont	= file_get_contents($url);

	preg_match_all("/<title>(.*)<\/title>/i", $cont, $matches);

	$title	= $matches[1][0];

	$title	= trim(substr($title, 9));

	$title	= html_entity_decode($title, ENT_QUOTES);

	return	$title;
}
