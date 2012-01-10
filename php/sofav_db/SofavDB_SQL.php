<?php

/**
 * SQL
 *
 * @package     SofavDB
 * @subpackage  SQL
 * @link        www.leakon.com
 * @version     2008-11-15
 * @author      Leakon <leakon@gmail.com>
 */
class SofavDB_SQL extends SofavDB_Criteria {

	public function execute(&$connection) {
		$statement	= $connection->prepare($this->strStatement);
		return		$statement->execute($this->arrBinding);
	}

	public function fetchAll(&$connection) {
		$statement	= $connection->prepare($this->strStatement);
		$statement->execute($this->arrBinding);
		return		$statement->fetchAll(PDO::FETCH_ASSOC);
	}

}