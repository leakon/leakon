<?php

/**
 * 2007-10-23 Leakon
 * �����������ɳ��򣬼򵥵ļӷ���
 * �����result.txt
 */

/*
��ʽ��
7+8=?
(����15)
*/

$intTotal	= 80;
$intMaxNumber	= 100;
$arrQuestions	= array();
$arrResult	= array();
$strFormat	= "%d+%d=?(����%d)";

while($intTotal > 0) {

	$intLeft	= rand(1, $intMaxNumber);
	$intRight	= rand(1, $intMaxNumber);
	$intSum		= $intLeft + $intRight;

	// Ϊ�����ⲻ�ظ����Ӻ����߶���������������ߵ�����ҪΨһ
	if ($intLeft && $intLeft < $intMaxNumber && $intRight && empty($arrQuestions[$intLeft])) {
		// �������ĺ�ҲҪΨһ
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