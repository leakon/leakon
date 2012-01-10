<?php

	// 本 PHP 程序源码文件必须是 GBK 字符集

	// 使用 GB2312，两个不同的汉字，会被 mb_strpos 认为是相同的
	mb_internal_encoding("GB2312");
	
	// 使用 GBK 就可以正常区分
#	mb_internal_encoding("GBK");
#	mb_internal_encoding("GB18030");	// Unknown encoding "GB18030"
		
	$strBadWord	= '肏';
	
//	$strSearchWord	= '↖(^ω^)↗';
	$strSearchWord	= '↖';
	
//	$intPos		= mb_strpos($strSearchWord, mb_strtolower($strBadWord));
	$intPos		= mb_strpos($strSearchWord, $strBadWord);
	
	var_dump($intPos);
	
	// 普通的 strpos 却可以返回正确结果
	$intNormalPos	= strpos($strSearchWord, $strBadWord);
	
	var_dump($intNormalPos);
	
#	var_dump(strlen($strBadWord), strlen($strSearchWord));
#	var_dump(urlencode($strBadWord), urlencode($strSearchWord));


