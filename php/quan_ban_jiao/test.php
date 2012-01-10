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


foreach ($arrWords as $word) {

	$arr	= array(
			$word,
			SafeFullToHalf($word)
		);

	print_r($arr);

}