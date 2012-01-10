<?php

require_once('explode.inc.php');

$arrLines	= array();

for($i = 0; $i < DATA_COUNT; $i++ ) {

	$arrLines[]	= 'd_' . dechex(rand(0, 9999990));

}

mysql_connect("localhost", "root", "123456");
mysql_select_db("test");

//$limit	= ' limit 0, 100';

$result = mysql_query("SELECT wid FROM word_history ORDER BY wid" . $limit);

$arrRes	= array();
while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {

	$arrRes[$row['wid']]	= $row;
}

mysql_free_result($result);

//print_r($arrRes);exit;

$i	= 0;


echo	"start:\t" . date("Y-m-d H:i:s") . "\n";

foreach($arrRes as $wid => $row) {

	$i++;

	if (0 == ($i % 1000)) {
		echo	"$i \n";
	}

	$concat	= ',' . $arrLines[$wid];


	$sql	= "update word_history set history = CONCAT(history, '$concat') where wid = $wid";

	mysql_query($sql);

}

echo	"stop:\t" . date("Y-m-d H:i:s") . "\n";
