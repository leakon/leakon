<?php

$dirBase	= dirname(__FILE__) . '/../';
#require_once($dirBase . 'SofavDB_Connection.php');
#require_once($dirBase . 'SofavDB_Model.php');
#require_once($dirBase . 'SofavDB_Query.php');
require_once($dirBase . 'SofavDB_Manager.php');
require_once($dirBase . 'SofavDB_Table.php');
require_once($dirBase . 'SofavDB_Criteria.php');
require_once($dirBase . 'SofavDB_SQL.php');

$strDataSourceYaml	= '
Table: mysql://root:123456@localhost:3306/test?encoding=utf8&persistent=on
';

SofavDB_Manager::addDataSource($strDataSourceYaml);

/*
SofavDB_Manage::loadDataSource('model: mysql://root:123456@localhost:3306/sofav_2008?encoding=utf8&persistent=off');
SofavDB_Connection::get('model');
*/

$globalConnection	= SofavDB_Manager::getConnection();

class SofavBDPDO extends SofavDB_Table {

	public function initialize() {

		$this->setTableName('pdo');

		$this->hasColumn('name');
		$this->hasColumn('body');
		$this->hasColumn('create_time');
		$this->hasColumn('created_at');
		$this->hasColumn('update_time');
		$this->hasColumn('updated_at');
	}
}
