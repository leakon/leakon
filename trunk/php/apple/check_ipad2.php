<?php

	$strStopFile	= dirname(__FILE__) . '/stop_check_ipad2.txt';
	
	if (file_exists($strStopFile)) {
		return;
	}

	$strUrl		= 'http://store.apple.com/cn/browse/home/shop_ipad/family/ipad/select';
	
	$strCont	= file_get_contents($strUrl);

	$intQty		= preg_match_all('#暂无供应#', $strCont, $matches);
	
	if ($intQty > 0 && $intQty != 6) {
		
		// iPad 2 is available
		
		NotifyMe($strStopFile, $strCont);
		
	}
	
	echo	sprintf("[%s] Still inavailable\n", date('Y-m-d H:i:s'));
	
	function NotifyMe($strStopFile, $strCont) {
		
		$strStopCont	= sprintf("iPad 2 is available [%s]", date('Y-m-d H:i:s'));
		
		$result		= mail("your.mail@gmail.com", $strStopCont, $strStopCont);
		
		file_put_contents($strStopFile, $strCont);
		
		return	$result;
		
	}
	
	
