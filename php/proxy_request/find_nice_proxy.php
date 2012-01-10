<?php

set_time_limit(0);

require_once('SendRequest.class.php');

/*
$tt	= CheckProxy('200.123.180.93', '8080', 5);
var_dump($tt);
*/

LogNiceProxy();

function LogNiceProxy() {

	$fileNice	= 'nice_proxy.txt';
	$fileBlack	= 'black_proxy.txt';

	$searchContent	= file_get_contents($fileNice) . file_get_contents($fileBlack);

	$arrList	= getProxyList();

	echo	"\nThere are " . count($arrList) . " proxies.\n";

	foreach($arrList as $proxyItem) {

		$proxyLine	= sprintf("%s:%s", $proxyItem['ip'], $proxyItem['port']);

		if (false !== strpos($searchContent, $proxyLine)) {
			echo	"\nSkip $proxyLine";
			continue;
		}

		$timeBegin	= time();
		$boolGoodProxy	= CheckProxy($proxyItem['ip'], $proxyItem['port'], 10);
		$timeEnd	= time();

		error_log($proxyLine . "\r\n", 3, $boolGoodProxy ? $fileNice : $fileBlack);

		echo	"\n" . date("H:i:s") . " [".($timeEnd - $timeBegin)."] "
			. sprintf("Testing %s ... ", $proxyLine) . ($boolGoodProxy ? "\t[Success!]" : '');
	}

}

function getProxyList() {
	return	unserialize(file_get_contents('http://code.leakon.com/php/cn_proxy/proxy.php?type=serial&cc=1'));
}

function CheckProxy($ip, $port, $timeout) {

	$url		= 'http://www.google.com/search?hl=zh-CN&q=yahoo&btnG=Google+%E6%90%9C%E7%B4%A2&meta=&aq=f';

	static $requestSocketObject = null;
	if (empty($requestSocketObject)) {
		$requestSocketObject = new SendRequest($url);
	}

	$arr_conf	= array(
		'host'		=> $ip,
		'port'		=> $port,
		'timeout'	=> $timeout,
		'url'		=> $url,
	);

	$retContent	= '';
	$retContent	= $requestSocketObject->openSocket($arr_conf);

	return	strlen($retContent) > 100 && preg_match("/yahoo\.com/i", $retContent);
}