<?php

class FullHalf {

	/*
		Not all of the words between 32 - 126 need to be converted to half code
		For example: ¡¶ and ¡· is Chinese book name symbol, should not be converted to < and >
		For your special need, please modify this method in a new class and add or comment some lines.
	*/
	public static function getMapping() {

		return	array(
			"¡¡" => " ",	// dec:32 hex:0x20
			"£¡" => "!",	// dec:33 hex:0x21

			"¡°" => "\"",	// dec:34 hex:0x22
			"¡±" => "\"",	// dec:34 hex:0x22	¡° corresponding ¡±
			"£¢" => "\"",	// dec:39 hex:0x27	£§English full quote

			"££" => "#",	// dec:35 hex:0x23
			"£¤" => "$",	// dec:36 hex:0x24
			"£¥" => "%",	// dec:37 hex:0x25
			"£¦" => "&",	// dec:38 hex:0x26

			"¡®" => "'",	// dec:39 hex:0x27
			"¡¯" => "'",	// dec:39 hex:0x27	¡® corresponding ¡¯
			"£§" => "'",	// dec:39 hex:0x27	£§English full quote

			"£¨" => "(",	// dec:40 hex:0x28
			"£©" => ")",	// dec:41 hex:0x29
			"¡Á" => "*",	// dec:42 hex:0x2a
			"£«" => "+",	// dec:43 hex:0x2b
			"£¬" => ",",	// dec:44 hex:0x2c
			"£­" => "-",	// dec:45 hex:0x2d
			"¡£" => ".",	// dec:46 hex:0x2e
			"¡¢" => "/",	// dec:47 hex:0x2f
			"£°" => "0",	// dec:48 hex:0x30
			"£±" => "1",	// dec:49 hex:0x31
			"£²" => "2",	// dec:50 hex:0x32
			"£³" => "3",	// dec:51 hex:0x33
			"£´" => "4",	// dec:52 hex:0x34
			"£µ" => "5",	// dec:53 hex:0x35
			"£¶" => "6",	// dec:54 hex:0x36
			"£·" => "7",	// dec:55 hex:0x37
			"£¸" => "8",	// dec:56 hex:0x38
			"£¹" => "9",	// dec:57 hex:0x39
			"£º" => ":",	// dec:58 hex:0x3a
			"£»" => ";",	// dec:59 hex:0x3b
		#	"¡¶" => "<",	// dec:60 hex:0x3c
			"£½" => "=",	// dec:61 hex:0x3d
		#	"¡·" => ">",	// dec:62 hex:0x3e
			"£¿" => "?",	// dec:63 hex:0x3f
			"£À" => "@",	// dec:64 hex:0x40
			"£Á" => "A",	// dec:65 hex:0x41
			"£Â" => "B",	// dec:66 hex:0x42
			"£Ã" => "C",	// dec:67 hex:0x43
			"£Ä" => "D",	// dec:68 hex:0x44
			"£Å" => "E",	// dec:69 hex:0x45
			"£Æ" => "F",	// dec:70 hex:0x46
			"£Ç" => "G",	// dec:71 hex:0x47
			"£È" => "H",	// dec:72 hex:0x48
			"£É" => "I",	// dec:73 hex:0x49
			"£Ê" => "J",	// dec:74 hex:0x4a
			"£Ë" => "K",	// dec:75 hex:0x4b
			"£Ì" => "L",	// dec:76 hex:0x4c
			"£Í" => "M",	// dec:77 hex:0x4d
			"£Î" => "N",	// dec:78 hex:0x4e
			"£Ï" => "O",	// dec:79 hex:0x4f
			"£Ð" => "P",	// dec:80 hex:0x50
			"£Ñ" => "Q",	// dec:81 hex:0x51
			"£Ò" => "R",	// dec:82 hex:0x52
			"£Ó" => "S",	// dec:83 hex:0x53
			"£Ô" => "T",	// dec:84 hex:0x54
			"£Õ" => "U",	// dec:85 hex:0x55
			"£Ö" => "V",	// dec:86 hex:0x56
			"£×" => "W",	// dec:87 hex:0x57
			"£Ø" => "X",	// dec:88 hex:0x58
			"£Ù" => "Y",	// dec:89 hex:0x59
			"£Ú" => "Z",	// dec:90 hex:0x5a
			"¡¾" => "[",	// dec:91 hex:0x5b
			"£Ü" => "\\",	// dec:92 hex:0x5c
			"¡¿" => "]",	// dec:93 hex:0x5d
			"¡­" => "^",	// dec:94 hex:0x5e
			"¡ª" => "_",	// dec:95 hex:0x5f
		#	"¡¤" => "`",	// dec:96 hex:0x60
			"£á" => "a",	// dec:97 hex:0x61
			"£â" => "b",	// dec:98 hex:0x62
			"£ã" => "c",	// dec:99 hex:0x63
			"£ä" => "d",	// dec:100 hex:0x64
			"£å" => "e",	// dec:101 hex:0x65
			"£æ" => "f",	// dec:102 hex:0x66
			"£ç" => "g",	// dec:103 hex:0x67
			"£è" => "h",	// dec:104 hex:0x68
			"£é" => "i",	// dec:105 hex:0x69
			"£ê" => "j",	// dec:106 hex:0x6a
			"£ë" => "k",	// dec:107 hex:0x6b
			"£ì" => "l",	// dec:108 hex:0x6c
			"£í" => "m",	// dec:109 hex:0x6d
			"£î" => "n",	// dec:110 hex:0x6e
			"£ï" => "o",	// dec:111 hex:0x6f
			"£ð" => "p",	// dec:112 hex:0x70
			"£ñ" => "q",	// dec:113 hex:0x71
			"£ò" => "r",	// dec:114 hex:0x72
			"£ó" => "s",	// dec:115 hex:0x73
			"£ô" => "t",	// dec:116 hex:0x74
			"£õ" => "u",	// dec:117 hex:0x75
			"£ö" => "v",	// dec:118 hex:0x76
			"£÷" => "w",	// dec:119 hex:0x77
			"£ø" => "x",	// dec:120 hex:0x78
			"£ù" => "y",	// dec:121 hex:0x79
			"£ú" => "z",	// dec:122 hex:0x7a
			"£û" => "{",	// dec:123 hex:0x7b
			"£ü" => "|",	// dec:124 hex:0x7c
			"£ý" => "}",	// dec:125 hex:0x7d
			"¡«" => "~",	// dec:126 hex:0x7e
		);

	}

	// For GBK Word. UTF-8 please directly use str_replace()
	// Final method, prevents child classes inherit.
	public static function fullToHalf($word) {

		static	$staticSafeFullToHalfFlag = null;

		if (empty($staticSafeFullToHalfFlag)) {

			$staticSafeFullToHalfFlag	= array('from' => array(), 'to' => array());
			$arrFrom			=& $staticSafeFullToHalfFlag['from'];
			$arrTo				=& $staticSafeFullToHalfFlag['to'];

			// Convert map to UTF-8
			foreach (self::getMapping() as $charFull => $charHalf) {
				$arrFrom[]	= self::mbConvert($charFull, 'UTF-8', 'GBK');
				$arrTo[]	= $charHalf;
			}
		}

		// Convert word to UTF-8
		$utf8_word		= self::mbConvert($word, 'UTF-8', 'GBK');

		// Use UTF-8 str_replace because it is safe
		$replaced_utf8_word	= str_replace($staticSafeFullToHalfFlag['from'], $staticSafeFullToHalfFlag['to'], $utf8_word);

		// Convert word to GBK
		return			self::mbConvert($replaced_utf8_word, 'GBK', 'UTF-8');
	}

	private static function mbConvert($word, $to, $from) {
		static	$staticMBDetectFlag = null;
		static	$staticIsMBEnabled = false;
		if (empty($staticMBDetectFlag)) {
			// not detect mb_string yet
			$staticMBDetectFlag = true;
			$staticIsMBEnabled = function_exists('mb_convert_encoding');
		}

		if ($staticIsMBEnabled) {
			return	mb_convert_encoding($word, $to, $from);
		} else {
			return	iconv($from, $to, $word);
		}
	}

}