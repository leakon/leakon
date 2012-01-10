<?php

/**
 * 2007-10-23 Leakon
 * 算术问题生成程序，简单的加法题
 * 输出到result.txt
 */

/*
格式：
7+8=?
(答案是15)
*/

$intTotal	= 80;
$intMaxNumber	= 100;
$arrQuestions	= array();
$arrResult	= array();
$strFormat	= "%d+%d=?(答案是%d)";

while($intTotal > 0) {

	$intLeft	= rand(1, $intMaxNumber);
	$intRight	= rand(1, $intMaxNumber);
	$intSum		= $intLeft + $intRight;

	// 为了问题不重复，加号两边都是正数，并且左边的数字要唯一
	if ($intLeft && $intLeft < $intMaxNumber && $intRight && empty($arrQuestions[$intLeft])) {
		// 加起来的和也要唯一
		if (!in_array($intSum, $arrQuestions)) {
			$arrQuestions[$intLeft]	= $intSum;
			$intTotal--;
		}
	}
}

foreach($arrQuestions as $intMyLeft => $intMySum) {
	$arrResult[]	= sprintf($strFormat, $intMyLeft, ($intMySum - $intMyLeft), $intMySum);
}

$fp	= fopen('result.txt', 'w+');
fwrite($fp, implode("\n", $arrResult));
print_r($arrResult);