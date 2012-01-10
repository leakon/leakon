<?php

error_reporting(15);

require_once(dirname(__FILE__) . '/MSNContact.class.php');

$res	= MSNContact::getList('leakon.test.01@live.com', 'pigpig');

print_r($res);
