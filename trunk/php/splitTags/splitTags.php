<?php

/**
 * 把长串文本转换成tag数组，英文单引号和双引号括起来的词作为一个tag
 * 其他的tag不允许有空格，所有tag不允许有全角空格
 *
 * @param string $stringTag
 * @return array
 */

function splitTags($stringTag) {

	$stringTag	= str_replace('　', '', $stringTag);
	$stringTag	= str_replace("'", '"', $stringTag);
	$stringTag	= trim(preg_replace('/\s+/', ' ', $stringTag));

	$tags		= array();

	$words		= preg_split('/(")/', $stringTag, -1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);
	$delim		= 0;

	foreach($words as $key => $word) {

		if($word == '"') {
			$delim++;
			continue;
		}

		if($word == ' ') {
			continue;
		}

		if($delim % 2 == 1) {
			$tags[]	= trim($word);
		} else {
			$tags	= array_merge($tags, preg_split('/\s+/', trim($word), -1, PREG_SPLIT_NO_EMPTY));
		}

	}

	return $tags;

}

?>