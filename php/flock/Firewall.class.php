<?php

class Firewall {

	private
		$limitCount,
		$dataFile,
		$lockObj,
		$interval;

	const
		LINE_FEED	= "\r\n",
		DELIMITER	= "\t";

	public function __construct() {

		$this->interval		= 1;

		$this->limitCount	= 200;

		$this->dataFile		= 'fw_data.txt';

		$this->lockObj		= new FileLock($this->dataFile);
	}

	private function dataToArray($dataContent) {
		$arrCounter	= array();
		foreach(explode(self::LINE_FEED, $dataContent) as $record) {
			$arr	= explode(self::DELIMITER, $record);
			if (!empty($arr[0])) {
				$arrCounter[$arr[0]]	= $arr[1];
			}
		}
		return	$arrCounter;
	}

	private function arrayToData($arrayRecord) {
		$dataContent	= '';
		foreach($arrayRecord as $time => $count) {
			$dataContent	.= $time . self::DELIMITER . $count . self::LINE_FEED;
		}
		return	$dataContent;
	}

	private function getInterval() {
		return	intval(time() / $this->interval);
	}

	public function setInterval($second) {
		$this->interval	= $second > 0 ? intval($second) : 1;
	}

	public function isGranted() {

		$currTime	= $this->getInterval();
		$dataContent	= $this->lockObj->read();
		$arrRecords	= $this->dataToArray($dataContent);

		$referRecord	=& $arrRecords[$currTime];

		if (isset($referRecord)) {

			if ($referRecord < $this->limitCount) {

				$referRecord	+= 1;
			} else {

				return	false;
			}

		} else {
			$referRecord	= 1;
		}

		$dataContent	= $this->arrayToData($arrRecords);
		$this->lockObj->write($dataContent);

		return	true;
	}
}