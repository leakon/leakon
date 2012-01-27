<?php

/**
 * 同步代码的 Conf 文件
 *
 *
 *
 */

class RSync_Conf {
	
	const
		CMD_KILL	= 'kill';
	
	static protected $arrConf	= array();
	
	public static function initConf() {
		
		if (empty(self::$arrConf)) {
				
			$is_linux	= 1;
			$script_dir	= '/home/backup/script/rsync/';
			$sync_dir	= '/home/backup/';
				
			$global_conf	= array(
						'is_linux'	=> intval($is_linux),
						'log_dir'	=> $script_dir . 'logs/',
						'conf_dir'	=> $script_dir . 'conf/',
					);
			
			$conf	= array();
			
			// 默认什么也不做，只需创建 from 和 to 这两个空目录
			$conf['default']	= array(
							'from'		=> $sync_dir . 'default/from/*',
							'to'		=> $sync_dir . 'default/to/',
							'speed'		=> '10',		// KB/s
						);
			
			$conf['server-1']	= array(
							'from'		=> 'user@server-1:/home/user/*',
							'to'		=> $sync_dir . 'server-1/home/user/',
							'speed'		=> '110',		// KB/s
						);
						
			$conf['server-2']	= array(
							'from'		=> 'user@server-2:/home/user/*',
							'to'		=> $sync_dir . 'server-2/home/user/',
							'speed'		=> '120',		// KB/s
						);
						
			self::$arrConf	= $conf;
			
			self::$arrConf['global']	= $global_conf;
			
		}
		
	}
	
	
	public static function getConf($serverName) {
		
		self::initConf();
		
		$serverName	= isset(self::$arrConf[$serverName]) ? $serverName : 'default';
		
		// 此时，serverName 一定是个有效的值，并且 conf 数组字段齐全
		$arrRetConf	= self::$arrConf[$serverName];
		
		$arrRetConf	= array_merge($arrRetConf, self::$arrConf['global']);
		
		$arrRetConf['exclude_file']	= sprintf("%sexclude.%s.conf",
							$arrRetConf['conf_dir'],
							$serverName
						);
						
		$arrRetConf['server_name']	= $serverName;
		
		return	$arrRetConf;
							
	}
	
}
