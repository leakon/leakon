<?php

require_once('quan_ban_jiao.php');


$arrWords	= array(
	'���ȣ�������ѧ��',
	'���������硱����ֵ�˫���ţ�',
	'���������ֵĵ����ţ�',
	"'�ͣУ�",
	'����',
	'�ͣУ�����',
	'������ɽʯ',
);


foreach ($arrWords as $word) {

	$arr	= array(
			$word,
			SafeFullToHalf($word)
		);

	print_r($arr);

}