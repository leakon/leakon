<?php

require_once('FullHalf.class.php');

/*
function getQuanBanMap() {

	static	$arrStaticQuanBanMap = null;

	if (empty($arrStaticQuanBanMap)) {

		$strQuanJiao	= '～！＠＃￥％…＆×（）—＋'
				. '·１２３４５６７８９０－＝'
				. '｛｝｜【】＼'
				. '：“；‘'
				. '《》？，。、'
				. 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'
				. 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'
				. '　';

		$strBanJiao	= '~!@#$%^&*()_+'
				. '`1234567890-='
				. '{}|[]\\'
				. ':";\''
				. '<>?,./'
				. 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
				. 'abcdefghijklmnopqrstuvwxyz'
				. ' ';

		$arrStaticQuanBanMap	= array();

		$len		= strlen($strBanJiao);
		for ($i = 0; $i < $len; ++$i) {

			$j		= $i * 2;
			$charQuan	= $strQuanJiao[$j] . $strQuanJiao[$j + 1];
			$arrStaticQuanBanMap[$charQuan]	= $strBanJiao[$i];
		}

	}

	return	$arrStaticQuanBanMap;

}
*/

// For GBK Word
function SafeFullToHalf($word) {

	return	FullHalf::fullToHalf($word);


	static	$staticSafeFullToHalfFlag = null;

	if (empty($staticSafeFullToHalfFlag)) {

		$staticSafeFullToHalfFlag	= array('from' => array(), 'to' => array());
		$arrFrom			=& $staticSafeFullToHalfFlag['from'];
		$arrTo				=& $staticSafeFullToHalfFlag['to'];

		// Convert map to UTF-8
		foreach (getQuanBanMap() as $charFull => $charHalf) {
			$arrFrom[]	= SafeConv($charFull, 'UTF-8', 'GBK');
			$arrTo[]	= $charHalf;
		}
	}

	// Convert word to UTF-8
	$utf8_word		= SafeConv($word, 'UTF-8', 'GBK');

	// Use UTF-8 str_replace because it is safe
	$replaced_utf8_word	= str_replace($staticSafeFullToHalfFlag['from'], $staticSafeFullToHalfFlag['to'], $utf8_word);

	// Convert word to GBK
	return			SafeConv($replaced_utf8_word, 'GBK', 'UTF-8');
}

function SafeConv($word, $to, $from) {
	static	$staticMBDetectFlag = null;
	static	$staticIsMBEnabled = false;
	if (empty($staticMBDetectFlag)) {
		// not detect mb_string yet
		$staticMBDetectFlag = true;
		$staticIsMBEnabled = function_exists('mb_convert_encoding');
	}

	if ($staticIsMBEnabled) {
		return	mb_convert_encoding($word, $to, $from);
	} else {
		return	iconv($from, $to, $word);
	}
}


/*
测试 开始

$arrStat	= array();

//	注意	……	——	都是2个全角字符

$strQuanJiao	= '～！＠＃￥％…＆×（）—＋'
		. '·１２３４５６７８９０－＝'
		. '｛｝｜【】＼'
		. '：“；‘'
		. '《》？，。、'
		. 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'
		. 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'
		. '　';

$strBanJiao	= '~!@#$%^&*()_+'
		. '`1234567890-='
		. '{}|[]\\'
		. ':";\''
		. '<>?,./'
		. 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		. 'abcdefghijklmnopqrstuvwxyz'
		. ' ';


$strLen		= strlen($strQuanJiao);
$strLenBan	= strlen($strBanJiao);

for ($i = 0; $i < $strLen; $i++) {

	$first	= $strQuanJiao[$i];
	$second	= $strQuanJiao[++$i];

	$char	= $first . $second;

#	echo	sprintf("[%s]\t[%s][%s]\n", $char, ord($first), ord($second));

	$arrStat[ord($first)]++;
}

#print_r($arrStat);


测试 结束
*/

/*

拿全角字符 ～ 来说，是由2个字节组成的，我们叫他左字节和右字节。
如果有两个汉字，比如 甲乙 ，甲的右字节，和乙的左字节，排在一起，正好是 ～ ，那么，就会有问题。
我们看看到底有多少个这样的汉字。

*/

/*

对比测试

function compareQuan($char) {

	static	$staticCompareMap = null;
	if (empty($staticCompareMap)) {
		$staticCompareMap = getQuanBanMap();
	}

	$left	= $char[0];
	$right	= $char[1];

	$arrChars	= array();

	for ($i = 0; $i < 256; $i++) {

		$c		= chr($i);
		$twoWord	= $c . $left . $right . $c;

		$before		= $twoWord;

	#	$after		= str_replace($char, $staticCompareMap[$char], $twoWord);
	#	$after		= mb_ereg_replace($char, $staticCompareMap[$char], $twoWord);
	#	$after		= SBC2DBC($twoWord);
		$after		= SafeFullToHalf($twoWord);
		$equal		= $before === $after;

		if (!$equal) {
			$arr		= array(
						'before'	=> sprintf("[ %s ]", $before),
						'after'		=> sprintf("[ %s ]", $after),
						'to'		=> sprintf("%s to %s", $char, $staticCompareMap[$char]),
					);

			$arrChars[]	= $arr;
		}

	}

	return	$arrChars;

}

$arr	= getQuanBanMap();

foreach ($arr as $quan => $ban) {

	$res	= compareQuan($quan);

	if (count($res)) {
		print_r($res);
	}

}


// 网上找的例子

function SBC2DBC($str)
{
    $ret = "";
    for($i=0;$i<strlen($str);$i++)
    {
     $h = ord($str[$i]);
     if($h==163)
     {
      $l = ord($str[++$i]) - 128;
      $ret .= chr($l);

     }
     else if(($h==161)&&(ord($str[$i+1])==161))//空格
     {
      $ret .= " ";
      $i++;
     }
     else if(($h==161)&&(ord($str[$i+1])==162))//顿号
     {
      $ret .= " ";
      $i++;
     }
     else if(($h==161)&&(ord($str[$i+1])==163))//句号
     {
      $ret .= ".";
      $i++;
     }

     else
     {
      $ret .= $str[$i];
      if($h>127)
       $ret .= $str[++$i];
     }

    }
    return $ret;
}


*/