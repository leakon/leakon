<?php

/**
 * 测试 array + array 与 array_merge(array, array) 的区别
 * add by Liulikang (2010-06-28)
 */

$arrAlpha	= array(
		1	=> 'Alpha_1',
		2	=> 'Alpha_2',
		3	=> 'Alpha_3',
		4	=> 'Alpha_4',
	);

$arrBeta	= array(
		3	=> 'Beta_3',
		4	=> 'Beta_4',
		5	=> 'Beta_5',
		6	=> 'Beta_6',
	);

$arrPlus	= $arrAlpha + $arrBeta;

$arrMerge	= array_merge($arrAlpha, $arrBeta);

print_r($arrPlus);
print_r($arrMerge);
