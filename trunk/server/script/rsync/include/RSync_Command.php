<?php

/**
 * 同步代码的 Command 文件
 *
 *
 *
 */

class RSync_Command {
	
	protected $serverName	= '';
	protected $arrConf	= array();
	
	public function __construct($paramServerName) {
		
		$this->arrConf		= RSync_Conf::getConf($paramServerName);
		
		$this->serverName	= $this->arrConf['server_name'];
		
	}
	
	/**
	 * 杀掉正在运行的进程
	 * 如果设置了 serverName，则只杀掉这个 server 的 rsync 进程，否则杀掉所有 rsync 进程
	 */
	public function getKillCmd() {
		
		/*
		ps ax | grep 'rsync' | grep 'bwlimit' | awk '{print $1}' | xargs kill -9
		*/
		
		$withServerName	= $this->serverName == 'default' ?  '' : sprintf("| grep '%s'", $this->serverName);
		
		// 只有 linux 环境才能 grep 到 serverName 和 bwlimit 字符串
		$is_linux	= $this->arrConf['is_linux'];
		
		$strGrepDetail	= $is_linux ? sprintf("%s | grep 'bwlimit'", $withServerName) : '';
		
		$strCommand	= sprintf("ps ax | grep 'rsync' %s | awk '{print $1}' | xargs kill -9",
					$strGrepDetail
				);
		
		return	$strCommand;
		
	}
	
	/**
	 * 获取同步的命令
	 *
	 */
	public function getSyncCmd() {
	
		$strIsRunningCmd	= $this->getIsRunning();
		
		$strLogFile	= sprintf("%srsync_web.%s.log", 
						$this->arrConf['log_dir'],
						$this->serverName
					);
				
		$strRsyncParam	= sprintf("--links --delete --recursive --itemize-changes --progress "
					. "--exclude-from=%s --bwlimit=%d",
					$this->arrConf['exclude_file'], $this->arrConf['speed']
				);
		
		$strCommand	= sprintf("%s && /usr/bin/nohup /usr/bin/rsync %s %s %s >> %s 2>&1 &",
					$strIsRunningCmd,
					$strRsyncParam, $this->arrConf['from'], $this->arrConf['to'],
					$strLogFile
				);
		
		return	$strCommand;
		
	}
	
	/**
	 * 判断是否已经有 rsync 进程在执行
	 *
	 * 利用 bash 的 cmd_1 && cmd_2 && cmd_3 这样的结构，如果 cmd_2 返回 false，则命令行停止，不会再有 cmd_3 执行
	 *
	 */
	protected function getIsRunning() {
		
		// 只有 linux 环境才能 grep 到 serverName 和 bwlimit 字符串
		$is_linux	= $this->arrConf['is_linux'];
		
		$strGrepDetail	= $is_linux ? sprintf("| grep '%s' | grep 'bwlimit'", $this->serverName) : '';
		
		$strCommand	= sprintf("rsync_process_num=\$(ps ax | grep 'rsync' | grep -v 'grep' %s | wc -l) "
					. "&& test \$rsync_process_num -lt 1",
					$strGrepDetail
				);
		
		return	$strCommand;
		
	}
	
}

