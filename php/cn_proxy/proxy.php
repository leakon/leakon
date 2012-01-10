<?php


$arrOfUrl	= array(
	array(
		'url'	=> 'http://www.proxycn.com/html_proxy/http-1.html',
		'type'	=> 'proxy_cn'
	),
	array(
		'url'	=> 'http://www.cnproxy.com/proxy1.html',
		'type'	=> 'cn_proxy'
	),
);

$proxyObj	= new SimpleProxy();

foreach($arrOfUrl as $val) {
	$proxyObj->addUrl($val['url'], $val['type']);
}

if ('csv' == $_GET['type']) {
	echo $proxyObj->getCsv();
	exit;
}

if ('m2' == $_GET['type']) {
	echo $proxyObj->getMaxthon2();
	exit;
}

if ('serial' == $_GET['type']) {
	echo $proxyObj->getSerial();
	exit;
}


echo $proxyObj->getText();

class SimpleProxy {

	private
		$url_list,
		$is_cached	= false;

	const
		CACHE_FILE	= 'proxy_cache.txt';

	public function __construct() {

	}

	private function cacheRead() {
		if (!empty($_GET['cc'])) {
			// clear today's data
			file_put_contents(self::CACHE_FILE, '');
		} else if (file_exists(self::CACHE_FILE) && filesize(self::CACHE_FILE) > 100) {
			$content	= file_get_contents(self::CACHE_FILE);
			$time		= date('YmdH');	// 20080218[14]
			if ($time == substr($content, 0, 10)) {
				$this->is_cached	= true;
				return	unserialize(substr($content, 10));
			}
		}
		return	false;
	}

	private function cacheWrite($arr) {
		file_put_contents(self::CACHE_FILE, date('YmdH') . serialize($arr));
	}

	private function getResultArray() {

		$resArray	= $this->cacheRead();
		if ($resArray !== false) {
			return	$resArray;
		}

		$resArray	= array();
		foreach($this->url_list as $key => $item) {
			$content	= file_get_contents($item['url']);
			$res		= call_user_func(array('SimpleProxy', $item['type']), $content);
			if (is_array($res)) {
				$resArray	= array_merge($resArray, $res);
			}
		}

		$this->cacheWrite($resArray);
		return	$resArray;
	}

	public function addUrl($url, $type) {
		$this->url_list[md5($url)]	= array(
			'url'	=> $url,
			'type'	=> $type
		);
	}

	public function getText() {

		$arr	= $this->getResultArray();
		$res	= array();
		foreach($arr as $proxyItem) {
			$res[]	= sprintf("%s:%s@HTTP#%s", $proxyItem['ip'], $proxyItem['port'], $proxyItem['location']);
		}

		header("Content-Type: text/html; charset=GBK");
		return	'<pre style="font-family:Tahoma;font-size:14px">' . "\n"
			. implode("\r\n", $res) . "\n" . ($this->is_cached ? "<!-- Cached -->" : "<!-- Not Cached -->")
			. '</pre>';
	}

	public function getCsv() {

		$arr	= $this->getResultArray();
		$res	= array();
		foreach($arr as $key => $proxyItem) {
			$res[]	= sprintf("%s;%s;0x1;an;%s;2", $proxyItem['ip'], $proxyItem['port'],
				//	$proxyItem['location']
					$key
					);
		}

		header("Content-Type: text/plain; charset=GBK");
		return	implode("\r\n", $res) . "\n" . ($this->is_cached ? "<!-- Cached -->" : "<!-- Not Cached -->");
	}

	public function getSerial() {
		echo	serialize($this->getResultArray());
	}

	public function getMaxthon2() {

		$arr	= $this->getResultArray();

		header("Content-Type: application/xml; charset=GBK");

		$arrHtml	= array();
		$arrHtml[]	= '<m2proxy version="1.0"><proxylist provider="http://discoverty.leakon.com/">';

		foreach($arr as $key => $proxyItem) {
		#	$arrHtml[]	= sprintf("%s:%s@HTTP#%s", $proxyItem['ip'], $proxyItem['port'], $proxyItem['location']);
			$arrHtml[]	= sprintf("<proxy name=\"%s\" address=\"%s:%s\" type=\"0\" />",
					$key, $proxyItem['ip'], $proxyItem['port']);
		}

		$arrHtml[]	= '</proxylist></m2proxy>';

		return	implode("", $arrHtml);
	}

	public static function proxy_cn($content) {

		$regex_ip_port	= "/onDblClick=\"clip\(\'(\d+\.\d+\.\d+\.\d+\:\d+)\'\)/i";
		$regex_location	= "/<TD class=\"list\">HTTP<\/TD><TD class=\"list\">(.*?)<\/TD>/i";

		preg_match_all($regex_ip_port, $content, $matches_ip_port);
		preg_match_all($regex_location, $content, $matches_location);


		$res		= array();
		foreach($matches_ip_port[1] as $key => $val) {

			$arr		= explode(':', $val);

			$res[$val]	= array(
				'ip'		=> $arr[0],
				'port'		=> $arr[1],
				'location'	=> preg_replace("/\sProxyCN/i", "", $matches_location[1][$key]),
			);

		}

		return	$res;
	}


	public static function cn_proxy($content) {

		$url_template	= "http://www.cnproxy.com/proxy%s.html";
		$regex		= "/<td>(\d+\.\d+\.\d+\.\d).*\:(\d+).*HTTP.*<td>(.*)<\/td><\/tr>/i";

		preg_match_all($regex, $content, $matches, PREG_SET_ORDER);

		$res		= array();
		foreach($matches as $val) {
			$key		= $val[1] . ':' . $val[2];	// unique key
			$res[$key]	= array(
				'ip'		=> $val[1],
				'port'		=> $val[2],
				'location'	=> $val[3],
			);
		}

		return		$res;
	}

}
