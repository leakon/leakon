<?php

/**
 * 同步代码的 Base 文件
 *
 *
 *
 */


class RSync_Base {
	
	public static function getParam($intNum, $default = '') {
		
		global	$argv;
		
		return	isset($argv[$intNum]) ? $argv[$intNum] : $default;
		
	}
	
	public static function executeShellCommand($strCommand) {
		
	}
	
}