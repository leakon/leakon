<?php

set_time_limit(0);

require_once('SendRequest.class.php');

/*
Test

GetCookieFromHeader(3);
exit;

*/



define('VOTE_URL',	'http://wangshang.alipay.com/nethome/voting.htm?bizid=373');

$count		= empty($_REQUEST['count']) ? 10 : abs(intval($_REQUEST['count']));

$arrProxyList	= GetNiceProxyList();

$RequestObj	= new SendRequest(VOTE_URL, 80, 20);

$arrProxyList	= array();

// 58.218.185.92:8080
/*
$arrProxyList[]	= array(
	'ip'	=> '202.28.102.62',
	'port'	=> '80',
);
$arrProxyList[]	= array(
	'ip'	=> '58.218.185.92',
	'port'	=> '8080',
);
*/


for ($try = 0; $try < 10; $try++) {

	foreach ($arrProxyList as $proxyKey => $proxyItem) {

		$proxyHost	= $proxyItem['ip'];
		$proxyPort	= $proxyItem['port'];

		$arr_conf	= array(
			'host'		=> $proxyHost,
			'port'		=> $proxyPort,
			'timeout'	=> 10,
			'url'		=> VOTE_URL,
		);

	#	print_r($arr_conf);

		$getContent	= $RequestObj->openSocket($arr_conf);
		$getHead	= substr($getContent, 0, strpos($getContent, "\r\n\r\n"));

		if (strlen($getHead)) {

			$arrCookies	= GetCookieFromHeader($getHead);
		#	print_r($arrCookies);

		} else {

			// 注销该服务器
			unset($arrProxyList[$proxyKey]);
			continue;
		}

		$RequestObj->setProxy($proxyHost, $proxyPort);

		// 220.181.38.245.1205824504589.9|1205826770

		$strCookie	= implode('; ', $arrCookies);

	#	$strCookie	= preg_replace("/=(\d+\.){4}12/i", '=' . GenIp() . '.12', $strCookie);

		$RequestObj->setHeader(  array( 'Cookie' => $strCookie )  );

		$mail		= substr(md5(time() . rand(1, 99999) . strval(microtime()) . rand(1, 99999)), 0, rand(6, 15)) . '@hotmail.com';
		$body		= "action=voting_action&email=$mail" . "&event_submit_do_vote.x=30&event_submit_do_vote.y=11";

		$RequestObj->setPost($body);

		$res		= $RequestObj->exec();

		$ret		= strlen($res['body']) ? 'Success' : 'Failed';

		$log		= sprintf("[%s]\t[%s]\t[%s:%s][%s]\n", date('H:i:s'), $ret, $proxyHost, $proxyPort, $mail);

		echo		$log;

		error_log($log, 3, 'log.txt');

	}
}


function GetNiceProxyList() {

	$fileNice	= 'nice_proxy.txt';
	$arrLines	= file($fileNice);

	$arrList	= array();

	foreach ($arrLines as $line) {

		$line	= trim($line);
		$arr	= explode(':', $line);

		$newArr	= array(
			'ip'	=> $arr[0],
			'port'	=> $arr[1],
		);

		array_unshift($arrList, $newArr);

	}

	return	$arrList;
}

function GetCookieFromHeader($strHeader) {

	preg_match_all("/Set-Cookie: ([^;]*);/i", $strHeader, $matches);

	return	isset($matches[1]) ? (array) $matches[1] : array();

}

function GenIp() {
	$arr	= array();
	$arr[] = rand(1, 244);
	$arr[] = rand(0, 255);
	$arr[] = rand(0, 255);
	$arr[] = rand(0, 255);
	return	implode('.', $arr);
}
