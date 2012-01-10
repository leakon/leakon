<?php

class FileLock {

	private
		$fileName,
		$fileHandle,
		$isLocked;

	public function __construct($fileName) {

		$this->fileName		= $fileName;

		if (!file_exists($this->fileName)) {
			touch($this->fileName);
		}

		$this->fileHandle	= fopen($this->fileName, 'r+');

		$this->isLocked		= flock($this->fileHandle, LOCK_EX);
	}

	public function __destruct() {
		$this->release();
	}

	public function release() {
		// Release the file lock.
		if ($this->fileHandle) {
			flock($this->fileHandle, LOCK_UN);
			fclose($this->fileHandle);
			$this->fileHandle = null;
		}
	}

	public function read() {
		if ($this->isLocked) {
			return	file_get_contents($this->fileName);
		} else {
			return	false;
		}
	}

	public function write($strContent, $pos = 0, $truncate = true) {
		if ($this->isLocked) {
			fseek($this->fileHandle, $pos);

			$length	= fwrite($this->fileHandle, $strContent);

			// Trancate useless data.
			if ($truncate) {
				ftruncate($this->fileHandle, $length);
			}

			return	$length;

		} else {
			return	false;
		}
	}
}
