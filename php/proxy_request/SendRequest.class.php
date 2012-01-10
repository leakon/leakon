<?php

class SendRequest {

	private
		$curlHandle,
		$header;

	public function __construct($url, $port = 80, $timeout = 30) {

		$this->curlHandle		= curl_init();
		curl_setopt($this->curlHandle, CURLOPT_URL, $url);
		curl_setopt($this->curlHandle, CURLOPT_HEADER, 0);
		curl_setopt($this->curlHandle, CURLOPT_FAILONERROR, 1);		// ����ʱ��ʾHTTP״̬�룬Ĭ����Ϊ�Ǻ��Ա��С�ڵ���400��HTTP��Ϣ
		curl_setopt($this->curlHandle, CURLOPT_FOLLOWLOCATION, 1);	// ����ʱ�Ὣ���������������ص�"Location:"����header�еݹ�ķ��ظ�������
		curl_setopt($this->curlHandle, CURLOPT_RETURNTRANSFER, 1);	// ��ΪTRUE��curl_exec()���ת��Ϊ�ִ���������ֱ�����

		curl_setopt($this->curlHandle, CURLOPT_PORT, $port);		// ���ö˿�
		curl_setopt($this->curlHandle, CURLOPT_TIMEOUT, $timeout);	// ��ʱʱ��
		curl_setopt($this->curlHandle, CURLOPT_HEADER, 1);		// ��ΪTRUE������а���ͷ��Ϣ

				// default header
		$this->header	= array(
			'Accept'		=> 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
			'Accept-Language'	=> 'zh-Cn,zh;q=0.5',
			'Accept-Charset'	=> 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
			'Connection'		=> 'keep-alive',
			'Cookie'		=> '',
		//	'Connection'		=> 'Close',
		//	'Accept-Encoding'	=> 'deflate',
		//	'User-Agent'		=> 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.9) Gecko/20071025 Firefox/2.0.0.9',
		);

	}

	public function setUserAgent($agent = false) {
		if (false === $agent) {
			$agent	= 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.9) Gecko/20071025 Firefox/2.0.0.9';
		}
		curl_setopt($this->curlHandle, CURLOPT_USERAGENT, $user_agent);	// HTTP����User-Agent:ͷ
	}

	public function setHeader($arrHeader) {
		foreach($arrHeader as $key => $val) {
			$this->header[$key]	= $val;
		}
	}

	public function setProxy($proxyHost, $proxyPort) {

		curl_setopt($this->curlHandle, CURLOPT_PROXY, $proxyHost);	// ���ô��������
		curl_setopt($this->curlHandle, CURLOPT_PROXYPORT, $proxyPort);	// ���ô���������˿�

	}

	private function composeHeader() {
		$arrItems	= array();
		foreach($this->header as $key => $val) {
			if (!empty($key)) {
				$arrItems[]	= "$key: $val";
			}
		}
		return	$arrItems;
	}

	private function composeHeaderString() {
		return	implode("\r\n", $this->composeHeader());
	}


	public function setPost($postParameters) {
		if (is_array($postParameters)) {
			$postParameters	= $this->composePostParameters($postParameters);
		}
		curl_setopt($this->curlHandle, CURLOPT_POST, 1);			// ����POST�ύ
		curl_setopt($this->curlHandle, CURLOPT_POSTFIELDS, $postParameters);	// ����POST�ύ���ַ���
	}

	private function composePostParameters($arrParam) {
		$arrPairs	= array();
		foreach ($arrParam as $key => $val) {
			$arrPairs[]	= "$key=$val";
		}
		return	implode("&", $arrPairs);
	}

	public function exec() {

		$retArray		= array();

		$retArray['header']	= $this->composeHeader();

	#	var_dump($retArray['header']);

		curl_setopt($this->curlHandle, CURLOPT_HTTPHEADER, $retArray['header']);	// ����HTTPͷ��Ϣ

		$retArray['body']	= curl_exec($this->curlHandle);				// ִ��Ԥ�����CURL
		$retArray['info']	= curl_getinfo($this->curlHandle);			// �õ�������Ϣ������

		if ($retArray['info']['http_code'] == 405) {
			// �������
			error_log("Bad proxy [$proxy]\n", 3, 'error_proxy.log');
		}

		return	$retArray;
	}

	public function openSocket($arrConf) {

		$strHttpResponse	= '';

		$host		= $arrConf['host'];
		$port		= $arrConf['port'];
		$url		= $arrConf['url'];
		$timeout	= isset($arrConf['timeout']) ? $arrConf['timeout'] : 10;
		$referer	= $_SERVER['SERVER_NAME'];	// Use this server's host as referer.

		try {

			$fp		= fsockopen($host, $port, $errno, $errstr, $timeout);

			if ($fp) {

				$strHead	= "GET $url HTTP/1.1\r\n";
				$strHead	.= "Host: $host\r\n";
				$strHead	.= $this->composeHeaderString();
				$strHead	.= "\r\n\r\n";

			#	var_dump($strHead);

				fwrite($fp, $strHead);

				$isSettimeout	= stream_set_timeout($fp, $timeout);

				if ($isSettimeout) {
					while (!feof($fp)) {
						$strHttpResponse	.= fread($fp, 512);
					}
				}

			}

		} catch (Exception $e) {
			error_log(strval($e)."\n", 3, 'error_socket.log');
		}

		fclose($fp);

		return	$strHttpResponse;
	}

	public function release() {
		curl_close($this->curlHandle);
	}

}