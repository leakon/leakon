<?php
/**
 * Smart Download
 * Support break resume
 * 2008-07-24	Leakon (leakon@gmail.com)
 */

class SmartDownload {

	private
		$fileHandle, $fileSize, $fileName, $fileTime;

	public function __construct($filePath, $fileConf = null) {

		if (!file_exists($filePath)) {
			header('HTTP/1.1 404 Not Found');
			exit;
		}

		$this->fileHandle	= fopen($filePath, 'rb');
		$this->fileSize		= filesize($filePath);
		$this->fileTime		= filemtime($filePath);

		// 文件名
		$this->fileName		= isset($fileConf['file_name']) ? $fileConf['file_name'] : basename($filePath);

		// 文件类型
		$contentType		= isset($fileConf['content_type']) ? $fileConf['content_type'] : 'application/octet-stream';

		// send necessary header

		header(sprintf('Last-Modified: %s GMT', gmstrftime('%a, %d %b %Y %T', $this->fileTime)));
		header(sprintf('Content-Disposition: attachment; filename="%s"', $this->fileName));
		header(sprintf('Content-Type: %s', $contentType));

		header('content-Transfer-Encoding: binary');
		header('Accept-Ranges: bytes');
		header('Pragma: public');
		header('Expires: 0');								// helper for foolish IE
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');		// helper for foolish IE
		header('Cache-Control: private', false);

	//	header(sprintf('Content-Description: PHP generated data'));

	}

	public function download() {

	//	$httpRange	= $_SERVER['HTTP_RANGE'];
		$httpRange	= getenv('HTTP_RANGE');
		if(!empty($httpRange)) {
			$this->downPartially($httpRange);
		} else {
			$this->downTotally();
		}
		exit;
	}

	/**
	 * resuming breakpoint
	 */
	private function downPartially($httpRange) {

		// HTTP_RANGE: bytes=offset-end
		if ($pos = strpos($httpRange, '=')) {
			$httpRange	= substr($httpRange, $pos + 1);
		}

		list($offset, $end) = explode('-', $httpRange);

		if ($end == '') {
			$end	= -1;
		}

		if ($offset == '') {
			$offset	= -1;
		}

		$offset	= floatval($offset);
		$end	= floatval($end);

		if ($end < 0 || $end >= $this->fileSize) {
			$end = $this->fileSize - 1;
		}

		if ($offset < 0 || $offset >= $this->fileSize) {
			$offset = 0;
		}

		$partialLen	= $end - $offset + 1;

		header('HTTP/1.1 206 Partial Content');
		header('Content-Range: bytes ' . $offset . '-' . $end . '/' . $this->fileSize);
		header('Content-Length: ' . $partialLen);

		fseek($this->fileHandle, $offset, SEEK_SET);

		$end++;
		while ($offset < $end) {
			$left		= $end - $offset;
			$block		= $left > 8192 ? 8192 : $left;
			echo		fread($this->fileHandle, $block);
			$offset		+= 8192;
		}
		fclose($this->fileHandle);
	}

	private function downTotally() {
		$endPos = $this->fileSize - 1;
		header('HTTP/1.1 200 OK');
		header(sprintf('Content-Range: bytes 0-%d/%d"', $endPos, $this->fileSize));
		header(sprintf('Content-Length: %d', $this->fileSize));
	//	header('Content-Range: bytes 0-' . $endPos . '/' . $this->fileSize . '"');
	//	header('Content-Length: ' . $this->fileSize);
		fpassthru($this->fileHandle);
	}

}