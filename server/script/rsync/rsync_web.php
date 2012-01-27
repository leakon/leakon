<?php

/**
 * 同步代码的 执行 文件
 *
 *
 *
 */

require_once(dirname(__FILE__) . '/require.php');

	$strServerName		= RSync_Base::getParam(1, '');
	$strKillCmd		= RSync_Base::getParam(2, '');
	
	if (RSync_Conf::CMD_KILL == $strKillCmd) {
		
		$objCommand		= new RSync_Command($strServerName);
		$strCmd			= $objCommand->getKillCmd();
		
	} else {
		
		$objCommand		= new RSync_Command($strServerName);
		$strCmd			= $objCommand->getSyncCmd();
		
	}

	echo	$strCmd;


