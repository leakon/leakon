<?php

class Sock {

	private
		$header,
		$proxyUrl,
		$useProxy;

	public function __construct($arrConf = null) {

		// default header
		$this->header	= array(
			'User-Agent'		=> 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.9) Gecko/20071025 Firefox/2.0.0.9',
			'Accept'		=> 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
			'Accept-Language'	=> 'zh-Cn,zh;q=0.5',
			'Accept-Charset'	=> 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
		//	'Accept-Encoding'	=> 'deflate',
			'Connection'		=> 'keep-alive',
			'Cookie'		=> '',
			'Connection'		=> 'Close',
		);

		// 如果指定了使用代理的 url，则设置标志位
		if (!empty($arrConf['proxy_url'])) {
			$this->proxyUrl		= $arrConf['proxy_url'];
			$this->useProxy		= true;
		}

	}

	private function composeHeader() {
		$arrItems	= array();
		foreach($this->header as $key => $val) {
			if (!empty($key)) {
				$arrItems[$key]	= "$key: $val";
			}
		}
		return	implode("\r\n", $arrItems);
	}


	public function setHeader($arrHeader) {
		foreach($arrHeader as $key => $val) {
			if (!empty($key)) {
				$this->header[$key]	= "$key: $val";
			}
		}
	}

	public function open($url, $port = 80, $timeout = 30) {

		$strUrl		= preg_replace("/http[s]?:\/\//i", '', $url);
		$intGetPos	= strpos($strUrl, '/');

		if (false === $intGetPos) {
			$host		= $strUrl;
			$get		= '/';
		} else {
			$host		= substr($strUrl, 0, $intGetPos);
			$get		= substr($strUrl, $intGetPos);
		}

		$fp	= fsockopen($host, $port, $errno, $errstr, $timeout);

		stream_set_timeout($fp, $timeout);

		if ($fp) {

			$out		= "GET $get HTTP/1.1\r\n";
			$out		.= "Host: $host\r\n";
			$out		.= $this->composeHeader();
			$out		.= "\r\n\r\n";

			fwrite($fp, $out);
			$strHttpResponse		= '';
			while (!feof($fp)) {
				$strHttpResponse	.= fread($fp, 512);
			}
			fclose($fp);

		//	echo	$strHttpResponse;

			$lineFeedPos		= strpos($strHttpResponse, "\r\n\r\n");
			$responseHeader		= substr($strHttpResponse, 0, $lineFeedPos);

			$intChunked		= null;
			$intChunked		= preg_match("/Transfer-Encoding: chunked/i", $responseHeader);

			$responseBodyBlocks	= substr($strHttpResponse, $lineFeedPos + 4);

			if ($intChunked) {

				$strBody		= '';
				$offset			= 0;

				do {

					$pos			= strpos($responseBodyBlocks, "\r\n", $offset);
					$diff			= $pos - $offset;
					$hex			= substr($responseBodyBlocks, $offset, $diff);
					$intPacketLength	= hexdec($hex);
					$strBody		.= substr($responseBodyBlocks, $pos + 2, $intPacketLength);
					$offset			= $pos + 4 + $intPacketLength;

				} while ($intPacketLength);

				return	$strBody;

			} else {
				return	$responseBodyBlocks;
			}

		} else {
			return	'';
		}
	}

	public function proxy($arrConf) {

		$strHttpResponse	= '';

		$host		= $arrConf['host'];
		$port		= $arrConf['port'];
		$url		= $arrConf['url'];
		$timeout	= $arrConf['timeout'];
		$referer	= $_SERVER['SERVER_NAME'];	// Use this server's host as referer.

		$fp		= fsockopen($host, $port, $errno, $errstr, $timeout);

		stream_set_timeout($fp, $timeout);

		if ($fp) {

			$out		= "GET $url\r\n";
			$out		.= "Host: $referer\r\n";
		#	$out		.= $this->composeHeader();
			$out		.= "\r\n\r\n";

			fwrite($fp, $out);
			$strHttpResponse		= '';
			while (!feof($fp)) {
				$strHttpResponse	.= fread($fp, 512);
			}
			fclose($fp);

		}

		return	$strHttpResponse;
	}

	public function proxyPublic($arrConf) {

		$strHttpResponse	= '';

		$host		= $arrConf['host'];
		$port		= $arrConf['port'];
		$url		= $arrConf['url'];
		$timeout	= $arrConf['timeout'];
		$referer	= $_SERVER['SERVER_NAME'];	// Use this server's host as referer.

		$fp		= @fsockopen($host, $port, $errno, $errstr, $timeout);

		if ($fp) {

			stream_set_timeout($fp, $timeout);

/*
			$out		= "GET $url\r\n";
			$out		.= "Host: $referer\r\n";
		#	$out		.= $this->composeHeader();
			$out		.= "\r\n\r\n";
*/


			$out		= "GET $url HTTP/1.1\r\n";
			$out		.= "Host: $host\r\n";
			$out		.= $this->composeHeader();
			$out		.= "\r\n\r\n";



			fwrite($fp, $out);
			$strHttpResponse		= '';
			while (!feof($fp)) {
				$strHttpResponse	.= fread($fp, 512);
			}
			fclose($fp);

		}

		return	$strHttpResponse;
	}
}