<?php

//	url -> module
// 	/photo/detail/123456/from/plaza?refer=diary

$script	= '/photo/detail.php';
	
	// '/photo/detail/123456/from/plaza?refer=diary';
	$_SERVER['REQUEST_URI']		= '/photo/detail/123456/from/plaza?refer=diary';
	$_SERVER['PHP_SELF']		= '/photo/detail/123456/from/plaza';
	$_SERVER['QUERY_STRING']	= 'refer=diary';

	$_REQUEST['rid']	= '123456';
	$_REQUEST['from']	= 'plaza';
	$_REQUEST['refer']	= 'diary';

	require_once($script);

$arrRoutings	= array(
			'detail'	=> array(
						'script'	=> '/photo/detail.php',
						'first'		=> 'rid',
						'patterns'	=> array(
									'rid',
									'from',
								),
					),
		
		);


// DRoutingBase	

//	module -> url


$arrPram	= array(
			'rid'	=> 12345,
			'from'	=> 'ÐìÐÂ»ª',
			'refer'	=> 'diary',
		);

$strUrl		= DPhotoRouting::genURI('detail', $arrParams);

// $strUrl -> /photo/detail/123456/from/plaza?refer=diary


