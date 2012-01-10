<?php

/**
 * Limit single IP access, log IP query string
 * Leakon 2007-09-11
 */
class IpLimit {

	public static function getClientIP() {
		return		preg_replace('/[^0-9.]/i', '', $_SERVER['REMOTE_ADDR']);
	}

	public static function getConnection() {
		static $ipConnection	= null;
		if(empty($ipConnection)) {
			$dbConf		= require('ip_limit.conf.php');
			$ipConnection	= mysql_connect($dbConf['host'], $dbConf['user'], $dbConf['pass']) or die('Could not connect to DB');
			mysql_select_db($dbConf['db'], $ipConnection);
		}
		return $ipConnection;
	}

	public static function logIP($granted_access) {
		$query_string	= $_SERVER['QUERY_STRING'];
		if (!get_magic_quotes_gpc()) {
			$query_string	= mysql_real_escape_string($query_string);
		}
		$log	= "INSERT INTO iplog SET granted_access = '%d', ip = '%s', query_string = '%s', created_at = '%s' ";
		$sql	= sprintf($log, intval($granted_access), IpLimit::getClientIP(), substr($query_string, 0, 255), date('Y-m-d H:i:s'));
		mysql_query($sql, IpLimit::getConnection());
	}


	public static function test($msg = '') {
		$rand	= rand(1, 9999) . mysql_real_escape_string($msg);
		$sql	= "INSERT INTO iplog SET granted_access = '2', query_string = '$rand' ";
		mysql_query($sql, IpLimit::getConnection());
		return	$sql;
	}

	/**
	 * update IP database
	 * $register = 1, add one record
	 * $register = 0, delete IP from table
	 */
	public static function updateIP($register) {
		if ($register) {
			$sql	= sprintf("INSERT INTO iplimit SET ip = '%s' ", IpLimit::getClientIP());
		} else {
			$sql	= sprintf("DELETE FROM iplimit WHERE ip = '%s' ", IpLimit::getClientIP());
		}
		mysql_query($sql, IpLimit::getConnection());
		return	$sql;
	}

	/**
	 * apply IP to access the web site resource
	 */
	public static function applyIP() {
		$sql		= sprintf("SELECT COUNT(*) AS total FROM iplimit WHERE ip = '%s' ", IpLimit::getClientIP());
		$result		= mysql_query($sql, IpLimit::getConnection());
		$row		= mysql_fetch_object($result);
		$success	= (0 == $row->total);

		if ($success) {
			IpLimit::updateIP(1);
			register_shutdown_function('IpLimitShutdown');
		}

		IpLimit::logIP($success);

		return		$success;
	}

}

function write_log($msg = '') {
	$fp	= fopen('write.log', 'a+');
	fwrite($fp, date('Y-m-d H:i:s') . "\t" . $msg . "\n");
}

function IpLimitShutdown() {

	$dbConf		= require('ip_limit.conf.php');
	$ipConnection	= mysql_connect($dbConf['host'], $dbConf['user'], $dbConf['pass']) or die('Could not connect to DB');
	mysql_select_db($dbConf['db'], $ipConnection);

	$sql	= sprintf("DELETE FROM iplimit WHERE ip = '%s' ", $_SERVER['REMOTE_ADDR']);
	mysql_query($sql, $ipConnection);
	write_log($sql);



//	$log	= IpLimit::updateIP(0);
//	write_log($log);
//	$log	= IpLimit::test($log);
//	write_log($log);
}