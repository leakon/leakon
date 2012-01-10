<?php

/**
 * �ѳ����ı�ת����tag���飬Ӣ�ĵ����ź�˫�����������Ĵ���Ϊһ��tag
 * ������tag�������пո�����tag��������ȫ�ǿո�
 *
 * @param string $stringTag
 * @return array
 */

function splitTags($stringTag) {

	$stringTag	= str_replace('��', '', $stringTag);
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