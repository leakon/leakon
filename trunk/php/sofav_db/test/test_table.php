<?php

require_once(dirname(__FILE__) . '/require_all.php');

######################################################################

/*
$obj_1		= new SofavBDPDO(6);
print_r($obj_1);
#print_r($obj_1->toArray());
#$obj->name	= 'llk';
#$obj->save();
*/

######################################################################

/*
$obj_2		= new SofavBDPDO();
$c		= new SofavDB_Criteria();
$c->setJoin(array('id' => 10, 'name' => "leakon's sofav"));
$res_2		= $obj_2->findAll($c);
#var_dump($obj_2->getSql());
#print_r($res_2);
*/

######################################################################

/*
$obj_3		= new SofavBDPDO();
$c		= new SofavDB_Criteria();
$c->setJoin(array('name' => 'abc'));
#$res_3		= $obj_3->findAll($c);
$res_3		= $obj_3->findAllObj($c);
$res_3[1]->body	= 'llkk';
#var_dump($obj_2->getSql());
print_r($res_3);
*/

######################################################################

/*
$obj_4		= new SofavBDPDO();
print_r($obj_4);
$obj_4->body	= 'hello the body!!';
print_r($obj_4);
*/

######################################################################

/*
$obj_5		= new SofavBDPDO(10);
print_r($obj_5);

$obj_5->body	= '55555';
print_r($obj_5);
*/

######################################################################

/*
$id	= rand(1, 6);
$obj_6	= new SofavBDPDO($id);
$res	= $obj_6->delete();
var_dump($res);
*/

######################################################################

$obj_7	= new SofavBDPDO();
$obj_7->body	= '55555';
$obj_7->save();
print_r($obj_7);

// fix empty problem, $obj_7->id is not empty!
var_dump(empty($obj_7->id));
var_dump(isset($obj_7->id));

######################################################################

/*
$obj_999	= new SofavBDPDO();
$obj_999->name	= 'name ' . rand(1000, 9999);
$res		= $obj_999->save();
echo	sprintf("obj_999 save:[%d]\n", $res);
print_r($obj_999);
#print_r($obj_999->toArray());
#echo	$obj_999->getSql();
sleep(2);
$obj_999->body	= 'body ' . rand(1000, 9999);
$res		= $obj_999->save();
echo	sprintf("obj_999 save:[%d]\n", $res);
print_r($obj_999);
#print_r($obj_999->toArray());
*/

######################################################################
