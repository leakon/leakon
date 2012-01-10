<?php

/**
 * Leakon
 *
 *
 */

/**
 * Generate multipart info, support files
 *
 * @author: Leakon
 * @date: 2011-01-07
 * @notice: add file types
 */

class MultipartPOST {
	
	const
		LINE_RETURN	= "\r\n",
		CHAR_SET	= "UTF-8",
		VERSION		= 0;
		
	protected static 
	
		// supportted file types
		$arrFileTypes		= array(
						
						'default'	=> 'application/octet-stream',
						'jpg'		=> 'image/jpg',
						'gif'		=> 'image/gif',
						'png'		=> 'image/png',
						'jpeg'		=> 'image/jpeg',
						'bmp'		=> 'image/bmp',
					//	'pjpeg'		=> 'image/pjpeg',
					//	'x-png'		=> 'image/x-png',
					
					);
		
	public static function genMultipartInfo($arrData, $arrFiles = array()) {
		
		$arrRet			= array();
		
		$strBoundary		= md5(time() . rand(1000, 9999) . rand(1000, 9999));
		
		$arrRet['header']	= array(
						'Content-Type: multipart/form-data; boundary=' . $strBoundary,
					);
					
		$strSep			= '--' . $strBoundary;
		
		$arrTemplate		= array(
						'Content-Disposition: form-data; name="%s"',
						'Content-Type: text/plain; charset=%s',
					#	'Content-Transfer-Encoding: 8bit',
						'',
						'%s',
					);
		
		$strTemplate		= implode(self::LINE_RETURN, $arrTemplate);
				
		$arrValues		= array();
			
		// plain text
		foreach ($arrData as $key => $val) {
			
			// 注意，multipart/form-data 的 value 不该做 urlencode
			$arrValues[]	= sprintf($strTemplate, $key, self::CHAR_SET, $val);
			
		}
		
		$arrFileTemplate	= array(
						'Content-Disposition: form-data; name="%s"; filename="%s"',
						'Content-Type: %s',
						'',
						'%s',
					);
		$strFileTemplate	= implode(self::LINE_RETURN, $arrFileTemplate);
		
		// upload file
		foreach ($arrFiles as $key => $val) {
			
			$filename	= $val['filename'];
			
			$arrPathInfo	= pathinfo($filename);
			
			$strExtName	= isset($arrPathInfo['extension']) ? $arrPathInfo['extension'] : 'default';
			
			if (empty(self::$arrFileTypes[$strExtName])) {
				$strExtName	= 'default';
			}
			
			$strFileType	= self::$arrFileTypes[$strExtName];
			
			// 注意，multipart/form-data 的 value 不该做 urlencode
			$arrValues[]	= sprintf($strFileTemplate, $key, $val['filename'], $strFileType, $val['binary']);
			
		}
		
		$strBody		= $strSep . self::LINE_RETURN
					. implode(self::LINE_RETURN . $strSep . self::LINE_RETURN, $arrValues)
					. self::LINE_RETURN . $strSep . '--';
		
		$arrRet['body']		= $strBody;
		
		return	$arrRet;
		
	}
	
} // EndOf class