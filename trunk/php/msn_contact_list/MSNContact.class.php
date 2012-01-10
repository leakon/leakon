<?php
/*
	MSN Contact List
	Leakon (leakon@gmail.com)
	2008-10-13
*/
class MSNContact {

	const
		MESSENGER_SERVER_HOST		= 'messenger.hotmail.com',
		MESSENGER_SERVER_PORT		= 1863,

		SSL_LOGIN_URL			= 'https://login.live.com/login2.srf',
		MESSENGER_ORG_URL		= 'http%3A%2F%2Fmessenger%2Emsn%2Ecom',		// encoded from "http://messenger.msn.com"

		SOCKET_TIME_OUT			= 2,	// Second

		VERSION				= '';

	private static
		$socketHandler			= null,
		$intTransactionCount		= 0,
		$boolIsAuthenticated		= false,

		$strMessengerServerHost		= self::MESSENGER_SERVER_HOST,
		$strMessengerServerPort		= self::MESSENGER_SERVER_PORT,

		$strPassportEmail		= '',
		$strPassportPassword		= '',

		$version			= '';

	public static function getList($strEmail, $strPassword) {

		self::$strPassportEmail		= $strEmail;
		self::$strPassportPassword	= urlencode($strPassword);

		self::communicateWithMessengerServer();

		$arrEntries	= self::receiveContactList();

		$arrMails	= self::retriveMails($arrEntries);

		return	$arrMails;

	}

	private static function communicateWithMessengerServer() {

		$ret	= false;

		// initialize counter
		self::$intTransactionCount	= 1;

		self::openSocketConnection(self::$strMessengerServerHost, self::$strMessengerServerPort);

		self::write(sprintf("VER %d MSNP9 CVR0\r\n", self::$intTransactionCount));

		$needNextWhileLoop	= true;

		do {

			$strContent	= self::read();
			$commandCode	= substr($strContent, 0, 3);

			switch ($commandCode) {

				case 'MSG':	// This prevents the script hanging as it waits for more content
					$needNextWhileLoop	= false;
					break;

				case 'XFR':	// found new server, go forward
		                        list($null_1, $null_2, $null_3, $newServerHostPort)	= explode (' ', $strContent);
		                        list(self::$strMessengerServerHost, self::$strMessengerServerPort)
		                        							= explode (':', $newServerHostPort);
		                        return	self::communicateWithMessengerServer();

				case 'VER':
					self::write(sprintf("CVR %d 0x0409 win 4.10 i386 MSNMSGR 7.0.0816 MSMSGS %s\r\n",
								self::$intTransactionCount, self::$strPassportEmail));
					break;

				case 'CVR':
					self::write(sprintf("USR %d TWN I %s\r\n",
								self::$intTransactionCount, self::$strPassportEmail));
					break;

				case 'USR':
					if (!self::$boolIsAuthenticated) {
						list($null_1, $null_2, $null_3, $null_4, $strAuthenticationCode)	= explode(' ', $strContent);
						$strAuthenticatedCode	= self::doCurlAuthentication($strAuthenticationCode);
						if ($strAuthenticatedCode) {
							self::write(sprintf("USR %d TWN S %s\r\n", self::$intTransactionCount, $strAuthenticatedCode));
							self::$boolIsAuthenticated	= true;
						}
					} else {
						$ret	= true;
					}
					break;

				default:
					break;

			}
		} while (!feof(self::$socketHandler) && $needNextWhileLoop && strlen($strContent));

		return	$ret;

	}

	private static function receiveContactList() {

		self::write(sprintf("SYN %d 0\r\n", self::$intTransactionCount));

		// Supplies the second MSG code which stops the script from hanging as it waits for more content
		self::write(sprintf("CHG %d NLN\r\n", self::$intTransactionCount));

		$needNextWhileLoop	= true;
		$arrMailList		= array();
		$intMailListCount	= 0;

		do {

			$arrStreamInfo		= stream_get_meta_data(self::$socketHandler);

			$strContent		= self::read();
			$commandCode		= substr($strContent, 0, 3);

			switch ($commandCode) {

				case 'MSG':	// This prevents the script hanging as it waits for more content
					$needNextWhileLoop	= false;
					break;

				case 'LST':
					$arrMailList[]		= $strContent;
					$intMailListCount++;
					break;

				case 'SYN':
					$arrExplode		= explode(' ', $strContent);
					$intTotalMailList	= intval($arrExplode[3]);
					break;

				case 'CHL':
					$arrExplode		= explode(' ', $strContent);
					$strRet			= md5($arrExplode[2] . 'Q1P7W2E4J9R8U3S5');
					self::write(sprintf("QRY %d msmsgs@msnmsgr.com 32\r\n%s", self::$intTransactionCount, $strRet));
					break;

				default:
					break;
			}


		} while (!feof(self::$socketHandler) && !$arrStreamInfo['timed_out'] && $needNextWhileLoop);

		fclose(self::$socketHandler);

		return	$arrMailList;

	}


	private static function retriveMails($arrList) {

		$arrEntries	= array();
		$arrRet		= array();

		// $regex = "|^LST\s(\S+?)\s(\S+?)\s\d+?\s\d+?$|";
		foreach ($arrList as $strMailEntry) {
			// Seperate out the email from the name and other data
			// $strMailEntry	= "LST leakon@live.com Likang 11 0";
			$arrEntries[]	= explode(' ', $strMailEntry);
		}

		// Get rid of the unnecessary data and clean up the name
		foreach ($arrEntries as $strMailEntry){
		//	$arrRet[]	= $strMailEntry[1];
			$arrRet[]	= array(
						'mail'	=> $strMailEntry[1],
						'name'	=> $strMailEntry[2],
						);
		}

		return	$arrRet;
	}


	private static function doCurlAuthentication($strAuthCode) {

		$CUrlHandler		= curl_init(self::SSL_LOGIN_URL);

		$arrHeader		= array();
		$arrHeader[]		= sprintf("Authorization: Passport1.4 OrgVerb=GET,OrgURL=%s,sign-in=%s,pwd=%s,%s",
						self::MESSENGER_ORG_URL, self::$strPassportEmail, self::$strPassportPassword, $strAuthCode);
		$arrHeader[]		= 'Host: login.passport.com';

		curl_setopt($CUrlHandler, CURLOPT_HTTPHEADER, $arrHeader);
		curl_setopt($CUrlHandler, CURLOPT_HEADER, 1);
		curl_setopt($CUrlHandler, CURLOPT_NOBODY, 1);
		curl_setopt($CUrlHandler, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt($CUrlHandler, CURLOPT_RETURNTRANSFER, 1);

	#	curl_setopt($CUrlHandler, CURLOPT_FOLLOWLOCATION, 1);
	#	curl_setopt($CUrlHandler, CURLOPT_TIMEOUT, 2);


		$strResponseHeader	= curl_exec($CUrlHandler);

		curl_close($CUrlHandler);

		preg_match("/from-PP='(.*?)'/", $strResponseHeader, $match);

		return (isset($match[1])) ? $match[1] : false;

	}

	private static function openSocketConnection($strHost, $strPort) {
		self::$socketHandler		= fsockopen($strHost, $strPort, $intErrorCode, $strErrorMsg, self::SOCKET_TIME_OUT);
		if (!self::$socketHandler) {
			die(sprintf("Could not connect to messenger service[%s:%s]!\nErrorCode: %s\nErrorMessage: %s\n",
					$strHost, $strPort, $intErrorCode, $strErrorMsg));
		} else {
			stream_set_timeout(self::$socketHandler, self::SOCKET_TIME_OUT);
		}
		return	self::$socketHandler;
	}

	private static function read() {
		if ($content = fgets(self::$socketHandler, 4096)) {
			self::dump($content);
			return	trim($content);
		}
		return	false;
	}

	private static function write($content) {
		fwrite(self::$socketHandler, $content);
		self::dump($content, "Send");
		self::$intTransactionCount++;
	}

	private static function dump($str, $type = '<<<<') {
		static	$conter = 1;
	#	$str	= trim($str);
	#	echo	sprintf("[%d][%s]\t%s\n----------------\n", $conter++, $type, $str);
	}

}
