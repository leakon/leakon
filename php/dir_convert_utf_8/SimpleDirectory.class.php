<?php


class SimpleDirectory {

	private
		$baseDir		= false,
		$arrAllowedTypes	= array(),
		$arrDeniedTypes		= array(),
		$boolRecursively	= true,		// default is recursively traverse the directory
		$ver			= 0;


	public function __construct($dir) {
		$this->setBaseDir($dir);
	}

	public function setBaseDir($dir) {

		$realpath	= realpath($dir);
		if ($realpath !== false && strlen($dir)) {
			$this->baseDir	= $realpath;
		} else {
			die(sprintf("[%s]: No such file or directory\n", $dir));
		}

	}

	public function addType($mixedExtName) {

		if (is_array($mixedExtName)) {
			$this->arrAllowedTypes		= array_merge($this->arrAllowedTypes, $mixedExtName);
		} else {
			$this->arrAllowedTypes[]	= $mixedExtName;
		}

		return	count($this->arrAllowedTypes);

	}

	public function addDeniedType($mixedExtName) {

		if (is_array($mixedExtName)) {
			$this->arrDeniedTypes		= array_merge($this->arrDeniedTypes, $mixedExtName);
		} else {
			$this->arrDeniedTypes[]	= $mixedExtName;
		}

		return	count($this->arrDeniedTypes);

	}

	public function removeType($mixedExtName) {

		$arrSearch	= array();
		if (is_array($mixedExtName)) {
			$arrSearch	=& $mixedExtName;
		} else {
			$arrSearch[]	= $mixedExtName;
		}

		foreach ($this->arrAllowedTypes as $key => $val) {

			foreach ($arrSearch as $type) {
				if ($val == $type) {
					unset($this->arrAllowedTypes[$key]);
				}
			}
		}

		return	count($this->arrAllowedTypes);

	}

	public function resetType() {
		$this->arrAllowedTypes	= array();
		$this->arrDeniedTypes	= array();
	}


	public function getFiles() {
		return	$this->doWork($this->baseDir);
	}

	public function setRecursivity($bool) {

		$this->boolRecursively	= $bool == true;

	}

	public function doWork($strTargetDir) {

		$arrFiles	= array();

		$strBaseDir	= realpath($strTargetDir);

		if (false !== $strBaseDir && $handle = opendir($strBaseDir)) {

			while (false !== ($file = readdir($handle))) {

				if ('.' == $file || '..' == $file) {
					continue;
				}

				$fileName	= $strBaseDir . '/' . $file;

				if (is_dir($fileName) && $this->boolRecursively) {

					$arr			= call_user_func(array($this, 'doWork'), $fileName);
					if (count($arr)) {
						$arrFiles	= array_merge($arrFiles, $arr);
					}

				} else {

					// À©Õ¹Ãû
					$arrInfo	= pathinfo($fileName);
					$extName	= $arrInfo['extension'];

					// Allowed list
					if (!in_array($extName, $this->arrAllowedTypes)) {
						continue;
					}

					// Denied list
					if (in_array($extName, $this->arrDeniedTypes)) {
						continue;
					}


					$fileName	= str_replace("\\", '/', $fileName);

					$arrFiles[]	= $fileName;

				}
			}

			closedir($handle);

		}

		return	$arrFiles;

	}




}


