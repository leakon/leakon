<?php

class LeakonXML {

	protected
		$isInTag	= false,		// 在 Tag 中
		$isInString	= false,		// 在 字符串 中
		$isInComment	= false,		// 注释

		$tagName	= '',
		$tagNameEnded	= false,		// 记录 Tag 名字是否已经获取完成
		$tagAttr	= '',
		$tagPos		= array(),		// 标签位置
		$tagStack	= array(),		// 标签堆栈
		$stackIndex	= array(),		// 堆栈索引

		$arrSingleTagStack	= array(),	// 独立 tag 堆栈
		$intSingleTagStackIndex	= -1,		// 独立 tag 堆栈索引

		$xmlContent	= '';


	protected static
		$arrSingleTag	= array(
					'DD'	=> 1,
					'DT'	=> 1,
				);

	protected static
		$arrMatchSingleTag	= array(
					'DL'	=> 1,
					'/DL'	=> 1,
					'DT'	=> 1,
					'DD'	=> 1,
				);

	protected static
		$tagOpeningMap	= array(
					'DD'	=> 1,
					'DT'	=> 1,
					'DL'	=> 1,
					'H3'	=> 1,
					'A'	=> 1,

					'TITLE'	=> 1,
					'H1'	=> 1,
				);

	protected static
		$tagClosingMap	= array(
					'DT'	=> 2,		// 2：说明与 opening tag 相同，没有 "/" 作为 closing tag 标志
								// 栈顶是什么 tag，DT 就对应该 tag
					'DL'	=> 2,

					'/A'	=> 1,		// 1："/" 指明了对应的 opening tag
					'/H3'	=> 1,

					'/TITLE'	=> 1,
					'/H1'	=> 1,
				);


	public function loadString($strXML) {

		$this->reset();

		$strXML			= mb_eregi_replace('<p>', '', $strXML);
		$strXML			= mb_eregi_replace('<HR>', '', $strXML);

		$pos			= mb_strpos($strXML, "<TITLE>", 0, 'UTF-8');


		$len			= mb_strlen($strXML, 'UTF-8');

		$this->xmlContent	= mb_substr($strXML, $pos, $len - $pos, 'UTF-8');

		file_put_contents('xmlContent.html', $this->xmlContent);

	}

	public function testTags() {

		$cont		= $this->xmlContent;

		$cont		= preg_replace("/>\s*\n*\s*</", ">\n<", $cont);
		$cont		= preg_replace("/>[^<]*</", ">\n<", $cont);
		$cont		= preg_replace("/(<[^>\s]+)\s*[^>]*(\/*>)/", "\$1\$2", $cont);
	#	$cont		= htmlspecialchars($cont, ENT_COMPAT, 'UTF-8');

		return	$cont;
	#	pr($cont);

	}

	public function getTags() {

	#	$len		= mb_strlen($this->xmlContent, 'UTF-8');
		$len		= strlen($this->xmlContent);

		$tagIndex	= 0;

		for ($i = 0; $i < $len; $i++) {

		#	$char		= mb_substr($this->xmlContent, $i, 1, 'UTF-8');
			$char		= $this->xmlContent[$i];

			// 在字符串中，只要不是 '"'，就立刻跳转到下次循环
			if ($this->isInString) {

				if ('"' == $char) {
					$this->isInString	= !$this->isInString;
				}

				if ($this->isInTag) {
					$this->tagAttr	.= $char;
				}

				continue;
			}

			if ('"' == $char) {

				$this->isInString	= !$this->isInString;

				if ($this->isInTag) {
					$this->tagAttr	.= $char;
				}

				continue;


			} else if ('<' == $char) {

				$this->arrTags[$tagIndex]	= array(
									'tag_name'	=> '',
								#	'tag_pos'	=> $i
								);

				$this->tagNameEnded	= false;
				$this->isInTag		= true;
				continue;


			} else if ('>' == $char) {

				$this->tagNameEnded	= true;

				$this->isInTag		= false;

				if (true === $this->tagNameEnded && strlen($this->tagName)) {

					$tag					= $this->tagName;
					$tagAttr				= $this->tagAttr;

					$this->arrTags[$tagIndex]['tag_name']	= $tag;
					$this->arrTags[$tagIndex]['tag_attr']	= $tagAttr;

					// 单独标签，没有匹配的结束标签
					if (isset(self::$arrMatchSingleTag[$tag])) {

						// found single tag
						if ($this->intSingleTagStackIndex > -1) {

							$singleTag	= $this->arrSingleTagStack[$this->intSingleTagStackIndex];

						#	$tagIndex++;
							$this->arrTags[$tagIndex]['tag_name']		= '/' . $singleTag;
						#	$this->arrTags[$tagIndex]['tag_open_pos']	= $openPosition;
						#	$this->arrTags[$openPosition]['tag_close_pos']	= $tagIndex;

							$tagIndex++;
							$this->arrTags[$tagIndex]['tag_name']	= $tag;
							$this->arrTags[$tagIndex]['tag_attr']	= $tagAttr;


							array_pop($this->arrSingleTagStack);
							$this->intSingleTagStackIndex--;


						}

						if (isset(self::$arrSingleTag[$tag])) {

							array_push($this->arrSingleTagStack, $tag);
							$this->intSingleTagStackIndex++;

						}


					}


					// closing tag, array_pop 出栈
					if (0 && isset(self::$tagClosingMap[$tag])) {

						$openPosition	= $this->tagPos[$this->stackIndex];
						$lastTag	= $this->tagStack[$this->stackIndex];


						if ('DD' == $lastTag) {

							$this->arrTags[$tagIndex]['tag_name']		= '/' . $lastTag;
							$this->arrTags[$tagIndex]['tag_open_pos']	= $openPosition;

							$this->arrTags[$openPosition]['tag_close_pos']	= $tagIndex;

							$tagIndex++;

							$this->arrTags[$tagIndex]['tag_name']	= $tag;
							$this->arrTags[$tagIndex]['tag_attr']	= $tagAttr;

							array_pop($this->tagStack);
							$this->stackIndex--;

							$openPosition	= $this->tagPos[$this->stackIndex];
							$lastTag	= $this->tagStack[$this->stackIndex];

						}



						// value = [1,2]
						$value		= self::$tagClosingMap[$tag];

						if (1 == $value) {

							$this->arrTags[$tagIndex]['tag_open_pos']	= $this->tagPos[$this->stackIndex];
							$this->arrTags[$openPosition]['tag_close_pos']	= $tagIndex;

						} else if (2 == $value) {

							$this->arrTags[$tagIndex]['tag_name']		= '/' . $lastTag;
							$this->arrTags[$tagIndex]['tag_open_pos']	= $openPosition;

							$this->arrTags[$openPosition]['tag_close_pos']	= $tagIndex;

							$tagIndex++;

							$this->arrTags[$tagIndex]['tag_name']	= $tag;
							$this->arrTags[$tagIndex]['tag_attr']	= $tagAttr;



						}

						array_pop($this->tagStack);
						$this->stackIndex--;

					}


					// opening tag, array_push 压栈
					if (0 && isset(self::$tagOpeningMap[$tag])) {
						array_push($this->tagStack, $tag);
						$this->stackIndex++;
						$this->tagPos[$this->stackIndex]	= $tagIndex;
					}

					$tagIndex++;

				}	// end of if

				$this->tagName		= '';
				$this->tagAttr		= '';

				continue;

			}

			// 处在 Tag 中
			if ($this->isInTag) {

				if (' ' == $char) {

					$this->tagNameEnded	= true;
					$this->tagAttr	.= $char;
					continue;

				} else {

					if (!$this->tagNameEnded) {
						$this->tagName	.= $char;
					}

					$this->tagAttr	.= $char;

				}

			}

			continue;

		}


	#	$cont		= implode("\n", $this->arrTags);

	#	return	$cont;
	#	pr($cont);
	#	pr($this->arrTags);

		return	$this->arrTags;

	}

	public function getDom() {

		$res		= self::tagToDom($this->arrTags);
		return	$res['documentRoot'];

	}

	public static function tagToDom($arrTags, $firstIndex = 0) {

		// document root
		$documentRoot		= array();

		$isInDataList		= false;
		$childIndex		= 0;
		$passedNodes		= 0;		// 经历过的节点数
		$arrLength		= count($arrTags);

		for ($tagIndex = $firstIndex; $tagIndex < $arrLength; $tagIndex++) {

			$passedNodes++;

			$tagItem	= $arrTags[$tagIndex];
			$nextTagIndex	= $tagIndex + 1;
			$tagName	= $tagItem['tag_name'];

		#	var_dump($tagName);
		#	pr($firstIndex . ': ' . $tagIndex . ' -> ' . $tagName);

			if ('DL' == $tagName) {
				$isInDataList	= true;
			}

			if ($isInDataList && '/DL' == $tagName) {
				break;
			}

			if ($isInDataList && 'DT' == $tagName) {

				// 下一个节点是 H3
				if ('H3' == $arrTags[$nextTagIndex]['tag_name']) {

					$documentRoot[$childIndex]	= array();

					// 从下一个节点开始递归调用
					$res		= self::tagToDom($arrTags, $nextTagIndex);
					$item		= array();
					$item['tag']	= 'DT';
					$item['type']	= 'FOLDER';
					$item['child']	= $res['documentRoot'];

					$documentRoot[$childIndex]	= $item;

					// skip some nodes
					$tagIndex	+= $res['passedNodes'];
					$childIndex++;

				}

			}

			if ('A' == $tagName) {
				// 普通链接
				$item		= array();
				$item['tag']	= 'A';
				$item['type']	= 'LINK';
				$item['link']	= $arrTags[$tagIndex];

				$documentRoot[$childIndex]	= $item;
				$childIndex++;
			}

		}	// end for

		$arrRet		= array();
		$arrRet['documentRoot']		= $documentRoot;
		$arrRet['passedNodes']		= $passedNodes;

		return	$arrRet;

	}


	protected function reset() {
		$this->isInTag		= false;
		$this->isInString	= false;
		$this->isInComment	= false;
	}


}

