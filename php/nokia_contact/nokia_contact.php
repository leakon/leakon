<?php

#header("Content-Type: text/plain; charset=UTF-8");
header("Content-Type: text/html; charset=UTF-8");

require_once(dirname(__FILE__) . '/skip.php');

$fileList	= dirname(__FILE__) . '/List/';

$arrTotal		= array();

if ($handle = opendir($fileList)) {

	while ($file = readdir($handle)) {

	//	echo "$file\n";

		if ('.' == $file || '..' == $file) {
			continue;
		}

		$vcfFile	= $fileList . $file;

	#	var_dump($vcfFile);

		$content	= file_get_contents($vcfFile);

		$content	= str_replace("\r", "", $content);
		$content	= str_replace("\n", "", $content);
		$content	= str_replace("END:VCARD", "", $content);
		$content	= str_replace("BEGIN:VCARDVERSION:2.1N", "", $content);
		$content	= str_replace(";=", "=", $content);
		$content	= str_replace(";ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8", "", $content);
		$content	= str_replace("TEL;", "", $content);

		$content	= str_replace("VOICE:", "CELL:", $content);
		$content	= str_replace("HOME:", "CELL:", $content);
		$content	= str_replace("WORK:", "CELL:", $content);
		$content	= str_replace("CELL:", ";CELL:", $content);

		$content	= preg_replace("/;+/", ";", $content);
		$content	= preg_replace("/^:/", "NAME:", $content);

		$arrRecord	= explode(';', $content);

	#	pr($arrRecord);
	#	continue;
	#	print_r($content);
	#	pr($content);

		$name		= $arrRecord[0];

		$name		= str_replace("==", "=", $name);
		$name		= str_replace("=", "%", $name);
		$name		= str_replace(";", "", $name);
		$name		= str_replace("NAME:", "", $name);

		$nameChar	= rawurldecode($name);

	//	$nameChar	= mb_convert_encoding($nameChar, 'GBK', 'UTF-8');
	//	echo		"$nameChar\n";
	//	$nameChar	= urldecode($name);
	//	print_r($nameChar);

		$item		= array(
					'src'		=> $content,
					'name'		=> $nameChar,
				);


	#	$regex2		= "/\:(\+?\d+)\r?\n/i";
		$regex2		= "/CELL\:([0-9\+]+)/i";

		preg_match_all($regex2, $content, $matches_2);

		$item['match']	= $matches_2;

		/*
		pr($item);
		pr($matches_2);
		pr($content);
		pr("=============================================");
		*/

	#	pr($matches_2[1]);

		$idx		= 1;
		foreach($matches_2[1] as $key => $val) {

			if (strlen($val) >= 11) {


				$val	= str_replace("+86", "", $val);
				$val	= str_replace("+0086", "", $val);

				$firstTowNum	= substr($val, 0, 2);

				$firstTowNum_2	= substr($val, 0, 3);

				if ('010' == $firstTowNum_2) {
					continue;
				}

				if (1 || '13' == $firstTowNum || '15' == $firstTowNum) {
				#	$item['phone'][$idx]	= $val;
					$item['phone'][]	= $val;
					$idx++;
				}

			}

		}

		if (isset($item['phone'])) {
			$arrTotal[]	= $item;
		}

	#	pr($item);

	}

	closedir($handle);

}


#pr($arrTotal);



$outFile	= 'output.txt';

$arrRow		= array();

$skips		= getSkipNames();
$arrSkipNumber	= getSkipNumbers();

foreach($arrTotal as $rows) {

#	$arrRow[]	= implode("\t", $rows);

	$name	= $rows['name'];

	if (isset($skips[$name])) {
		continue;
	}

	if (empty($rows['phone'])) {
		pr($rows);
	}

	foreach ((array)$rows['phone'] as $phone) {

		if (isset($arrSkipNumber[$phone])) {
			continue;
		}


		$arrRow[]	= sprintf('%s		%s', $phone, $name);
	}

}

	pr($arrRow);

$content	= implode("\r\n", $arrRow);

file_put_contents($outFile, $content);




	function pr($arr, $nameSpace = '') {
		echo	'<pre style="font-family:Courier New; font-size:13px">';
		if ($nameSpace) {
			echo	$nameSpace;
			echo	"\n";
		}
		print_r($arr);
		echo	'</pre>';
	}
