<?php

/**
 * 同步代码的 require 文件
 *
 *
 *
 */

define('RSYNC_CURRENT_DIR',	dirname(__FILE__) . '/');

require_once(RSYNC_CURRENT_DIR . 'conf/RSync_Conf.php');
require_once(RSYNC_CURRENT_DIR . 'include/RSync_Base.php');
require_once(RSYNC_CURRENT_DIR . 'include/RSync_Command.php');

