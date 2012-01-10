<?php

require_once(dirname(__FILE__) . '/require_all.php');

######################################################################

$obj_1		= new SofavDB_Criteria('UPDATE table_name SET @set WHERE @where');
print_r($obj_1);

$arrSet		= array(
			'name'		=> 1,
			'age'		=> 2,
			'gender'	=> 3
		);

$arrWhere	= array(
			'id'		=> 10,
			'category_id'	=> 18
		);

$obj_1->bind($arrSet, ',', '@set')->bind($arrWhere, 'AND', '@where');
print_r($obj_1);

######################################################################

/*
$obj_2		= new SofavDB_SQL('SELECT * FROM pdo WHERE @where_1 OR @where_2');
$res		= $obj_2->bind(array('id' => 2), '', '@where_1')->bind(array('id' => 8), '', '@where_2')->fetchAll($globalConnection);
print_r($res);
*/

######################################################################

/*
$obj_3		= new SofavDB_SQL('INSERT INTO pdo SET @set_1, @set_2');
$bool		= $obj_3->bind(array('name' => rand(100, 499)), ',', '@set_1')->bind(array('body' => rand(500, 999)), ',', '@set_2')->execute($globalConnection);
var_dump($bool);
print_r($obj_3);
*/

######################################################################

/*
$bool		= SofavDB_SQL::getInstance('INSERT INTO pdo SET @set_1, @set_2')
			->bind(array('name' => rand(100, 499)), ',', '@set_1')
			->bind(array('body' => rand(500, 999)), ',', '@set_2')
			->execute($globalConnection);
*/

######################################################################
