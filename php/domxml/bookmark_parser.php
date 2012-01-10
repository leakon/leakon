<?php

class BookmarkParser {

	private
		$favContent,
		$stack,
		$data,
		$depth,
		$result,
		$version;


	public function __construct() {

		$this->favContent	= '';
		$this->stack		= array();
		$this->data		= array();
		$this->depth		= 0;

	}

	public function setInputString($str) {
		$this->favContent = $str;
	}

	public function setInputFile($file) {
		if (file_exists($file)) {
			$this->favContent = file_get_contents($file);
		}
	}

	public function parse() {
		return	$this->_parse();
	}

	public function dumpContent() {
		return	$this->favContent;
	}

	private function _parse() {

		$this->formatContent();

		$this->parser	= self::getParser();

		if (1) {
			xml_parse_into_struct($this->parser, $this->favContent, $arrVar, $arrIndex);
			$this->result	= array('index' => $arrIndex, 'data' => $arrVar);
		} else {

			//Set the handlers
			xml_set_object($this->parser, $this);
			xml_set_element_handler($this->parser, 'startElement', 'endElement');
			xml_set_character_data_handler($this->parser, 'characterData');
		}

		//Error handling
		if (!xml_parse($this->parser, $this->favContent)) {
			$this->handleError(
						xml_get_error_code($this->parser),
						xml_get_current_line_number($this->parser),
						xml_get_current_column_number($this->parser)
					);
		}

		//Free the parser
		xml_parser_free($this->parser);

	}

	private function startElement($parser, $name, $attrs = array()) {

		array_push(
				$this->stack,
				array(
					'name'	=> $name,
					'attr'	=> $attrs
				)
			);

		$this->depth++;
		$this->data[$this->depth]	= '';

	}

	private function endElement($parser, $name) {
		$element	= array_pop($this->stack);
		$data		= $this->data[$this->depth];
		$this->depth--;

		$this->handleElement($element['name'], $element['attr'], $data);

	}

	private function characterData($parser, $data) {
		$this->data[$this->depth]	= trim($data);
	}

	public function handleElement($name, $attribs, $data) {

		$this->result[]	= array($name, $attribs, $data);
	//	pr();

	}

	public function getResult() {

		return	$this->result;
	#	pr($this->result);

	}

	public function getBookmark() {

		$arrOfStruct	= $this->result;

		$res		= $this->getFolders($arrOfStruct);

		pr($res);

	}

	private function getFolders($struct) {

		/*
		遍历 DL 数组，得到根节点和所有文件夹节点
		根节点的 Level 为 2
		文件夹节点的 Level 为 3
		*/

		$refData	= $struct['data'];
		if (empty($refData) || 0 == count($refData)) {
			return	"Undefined Data array!";
		}

		$referDT	=& $struct['index']['DT'];
		if (empty($referDT) || 0 == count($referDT)) {
			return	"Undefined DT array!";
		}

		$referDL	=& $struct['index']['DL'];

		$indexOfFolder	= 0;
		$stackOfFolder	= array();	// 堆栈，保存 DL 的索引
		$arrOfFolder	= array();

		foreach($referDL as $key => $indexOfDL) {

			if (isset($refData[$indexOfDL])) {

				if ('open' == $refData[$indexOfDL]['type']) {
					// 压栈
					array_push($stackOfFolder, $indexOfDL);

				} else if ('close' == $refData[$indexOfDL]['type']) {
					// 退栈
					$indexOfOpenedDL	= array_pop($stackOfFolder);

					$arr			= array(
									'begin'	=> $indexOfOpenedDL,
									'end'	=> $indexOfDL,
									'level'	=> $refData[$indexOfDL]['level']
								);

					$arrOfFolder[$indexOfFolder]	= $arr;
					$indexOfFolder++;

				}
			}
		}

	#	pr($arrOfFolder);

		/*
		遍历 DT 数组，按照上一步生成的文件夹节点数组： $arrOfFolder 访问每一个 DT
		*/

		// 交换 DT 数组的 key 和 value，便于快速查询
		$arrOfDTToSearch	= array_flip($referDT);
		$arrOfSavedDT		= array();

		foreach($arrOfFolder as $key => $arrFolder) {

			$begin	= $arrFolder['begin'];
			$end	= $arrFolder['end'];

			for($i = $begin + 1; $i < $end; ++$i) {
				// 访问每一个 DT 索引数组，把对应的数据提取出来

				if (isset($arrOfDTToSearch[$i])) {
					// 存在对应的 DT 元素

					if (isset($arrOfSavedDT[$i])) {
						// 保存过的 DT，直接跳过，目的是避免 Level 为 2 的根节点重复保存 DT 节点
					} else {
						if ($valueOfDT = self::explodeTag($refData[$i]['value'])) {
							$arrOfFolder[$key]['children'][]	= $valueOfDT;
						}
						$arrOfSavedDT[$i]	= 1;
					}
				}
			}
		}

		pr($arrOfFolder);exit;


	}

	private static function explodeTag($strOfTag) {

		$strOfTag	= trim($strOfTag);

		if (isset($strOfTag) && strlen($strOfTag)) {

			if (strlen($valueOfLink = trim(strip_tags($strOfTag)))) {

				preg_match_all("/^<(A|H3)/i", $strOfTag, $matches);
				$tagName	= $matches[1][0];

				preg_match_all("/(A|H3)?([^=]+=\".*?\")/i", preg_replace("/^<(A|H3)/i", "", $strOfTag), $matches);

				$arrOfAttributes		= array();
				if (!empty($tagName)) {
					$arrOfAttributes['TYPE']	= $tagName;
				}
			#	$arrOfAttributes['LINE']	= htmlspecialchars($strOfTag);
				$arrOfAttributes['CONTENT']	= $valueOfLink;

				if (!empty($matches[2])) {


					foreach($matches[2] as $strOfAttribute) {

						$arrKeyVal	= explode('=', $strOfAttribute, 2);
						$key		= trim($arrKeyVal[0]);
						$val		= trim(preg_replace("/[\'\"]([^\'\"]*)[\'\"]/i", "\$1", $arrKeyVal[1]));

						$arrOfAttributes[$key]	= $val;

					}

				}

				return	$arrOfAttributes;
			#	return	$strOfTag;

			}
		}

		return	false;
	}


	private function HandleError($code, $line, $col) {
		trigger_error('XML Parsing Error at '.$line.':'.$col.'. Error '.$code.': '.xml_error_string($code));
	}


	private function formatContent() {


		if (!self::isUTF8($this->favContent)) {
			$this->favContent	= mb_convert_encoding($this->favContent, 'UTF-8', 'GBK');
		}

	//	return;

		$this->favContent	= preg_replace("/<meta [^>]*?>/i", "", $this->favContent);


		$this->favContent	= preg_replace("/(<TITLE[^>]*>)/i",
							"<META HTTP-EQUIV=\"Content-Type\" CONTENT=\"text/html; charset=UTF-8\">\$1",
							$this->favContent);



		$this->favContent	= str_replace("\r\n", "\n", $this->favContent);		// Convert to unix line terminator
	//	$this->favContent	= str_replace("\n", "", $this->favContent);


	//	$this->favContent	= preg_replace("/(<H3 [^>]*)FOLDED([^>]*>)/i", "\$1\$2", $this->favContent);
		$this->favContent	= preg_replace("/(<H3 [^>]*)FOLDED([^>]*>)/i", "\$1 FOLDED=\"FOLDED\" \$2", $this->favContent);

		// DL tag
		$this->favContent	= preg_replace("/<DL><p>/i", "<DL>", $this->favContent);
		$this->favContent	= preg_replace("/<\/DL><p>/i", "</DL>", $this->favContent);

		// DT tag
		$this->favContent	= preg_replace("/<\/A>/i", "</A></DT>", $this->favContent);
		$this->favContent	= preg_replace("/<\/H3>/i", "</H3></DT>", $this->favContent);


		// DD tag
	//	$this->favContent	= preg_replace("/<DD>(.*?)(\n*)(<\/?D)/i", "<DD>\$1</DD>\$2\$3", $this->favContent);
		$this->favContent	= preg_replace("/<DD>(.*?)(\n*)(.*?)(<\/?D)/i", "<DD>\$1</DD>\$2\$3\$4", $this->favContent);

		// Clear double close tag
		$this->favContent	= preg_replace("/<\/DT>[\n\s]*<\/DT>/i", "</DT>", $this->favContent);
		$this->favContent	= preg_replace("/<\/DD>[\n\s]*<\/DD>/i", "</DD>", $this->favContent);


		// <![CDATA[  ]]>
		foreach(array('A', 'H3') as $tag) {
			$this->favContent	= preg_replace("/(<$tag\s*[^<]*>.*?\n*<\/$tag>)/i", "<![CDATA[\$1]]>", $this->favContent);
		}


	//	$this->favContent	= preg_replace("/>(.*\n.*)<HR>(.*\n.*)</i", ">\$1<HR></HR>\$2<", $this->favContent);
		$this->favContent	= preg_replace("/>(.*\n.*)<HR>(.*\n.*)</i", ">\$1\$2<", $this->favContent);

	//	$this->favContent	= '<xml>' . $this->favContent . '</xml>';
		$this->favContent	.= '</META>';

	}

	// Singleton get paser object
	private static function getParser() {

		static $parserInstance = null;

		if (empty($parserInstance)) {
			$parserInstance = xml_parser_create();

			xml_parser_set_option($parserInstance, XML_OPTION_CASE_FOLDING, 0);
			xml_parser_set_option($parserInstance, XML_OPTION_SKIP_WHITE, 1);


		}

		return	$parserInstance;
	}

	// From http://w3.org/International/questions/qa-forms-utf-8.html
	private static function isUTF8($string) {

		//	IF mb_string is compiled, use mb_detect_order & mb_detect_encoding is prefered.
		//	mb_detect_order("UTF-8,GBK,SJIS,EUC-JP");
		//	$encoding	= mb_detect_encoding($string);

		$regex	= '/^('
			. '[\x09\x0A\x0D\x20-\x7E]|'		# ASCII
			. '[\xC2-\xDF][\x80-\xBF]|'		# non-overlong 2-byte
			. '\xE0[\xA0-\xBF][\x80-\xBF]|'		# excluding overlongs
			. '[\xE1-\xEC\xEE\xEF][\x80-\xBF]{2}|'	# straight 3-byte
			. '\xED[\x80-\x9F][\x80-\xBF]|'		# excluding surrogates
			. '\xF0[\x90-\xBF][\x80-\xBF]{2}|'	# planes 1-3
			. '[\xF1-\xF3][\x80-\xBF]{3}|'		# planes 4-15
			. '\xF4[\x80-\x8F][\x80-\xBF]{2}'	# plane 16
			. ')*\z/x';

		return	1 == preg_match($regex, $string);
	}

}
