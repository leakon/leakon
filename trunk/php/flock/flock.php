<?php

/**
 * Server Id Assignment Service
 *
 * You have one web server, 64 backend data servers.
 * The web server read data from backend server.
 * But the data server can NOT afford to heavy load, so you must make the load balanced.
 *
 * Liulikang (http://www.leakon.com/)
 * 2007-12-05
 */

/**
Usage:

$conf	= array(
	'server_count'	=> 32,
	'data_file'	=> '/tmp/id_service_data.txt',
);

$serviceObj	= new IdService($conf);

for($i = 0; $i < 10000; $i++) {

	$id	= $serviceObj->getId();

}
*/


class IdService {

	private
		$serverCount,	// How many servers do you have?
		$dataFile;	// The service data file, absolute file path is prefered.

	const	LINE_FEED	= "\r\n",
		MAX_LOAD	= 256,
		DATA_BLOCK	= 2048;		// Must bigger than the size of data file.

	public function __construct($arrConf) {

		$this->serverCount	= intval($arrConf['server_count']);
		$this->dataFile		= $arrConf['data_file'];

		if (!file_exists($this->dataFile)) {
			touch($this->dataFile);
		}
	}

	public function getId() {

		$serverId	= rand(0, $this->serverCount - 1);	// If no Id selected, make a random one.

		// Open data file.
		$fp		= fopen($this->dataFile , 'r+');

		// Set a file lock, other processes can NOT read the file until the file has been unlocked.
		if (flock($fp , LOCK_EX)) {

			$dataContent	= fread($fp, self::DATA_BLOCK);
			$arrLines	= explode(self::LINE_FEED, $dataContent);

			// Convert to intval in case of the count is empty.
			for($j = 0; $j < $this->serverCount; $j++) {
				$arrLines[$j]	= intval($arrLines[$j]);
			}

			$intMinCount	= self::MAX_LOAD;			// Set a large number to find a min count.
			for($j = 0; $j < $this->serverCount; $j++) {
				if ($arrLines[$j] <= $intMinCount) {
					// Find a min count.
					$intMinCount	= $arrLines[$j];
					$serverId	= $j;
				}
			}

			// Found the expected server Id, increase count number.
			$arrLines[$serverId]	+= 1;

			// If any server's count reach the max load number, reset all server's count to 0.
			if ($arrLines[$serverId] > self::MAX_LOAD) {
				for($j = 0; $j < $this->serverCount; $j++) {
					$arrLines[$j]	= 0;
				}
			}

			// Generate new data content.
			$pushContent	= implode(self::LINE_FEED, $arrLines);
			// Set file pointer to home.
			fseek($fp, 0);

			// Save new data.
			$length	= fwrite($fp, $pushContent);

			// Trancate useless data.
			ftruncate($fp, $length);

			// Release the file lock.
			flock($fp , LOCK_UN);

		}

		fclose($fp);

		return	$serverId;
	}
}
