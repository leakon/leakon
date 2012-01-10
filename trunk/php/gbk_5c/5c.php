<?php

/*

CREATE DATABASE c5 DEFAULT CHARACTER SET gbk COLLATE gbk_chinese_ci;

CREATE TABLE `records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` char(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=gbk  ;


*/


	$link		= mysql_connect("localhost", "root", "123456") or
				die("Could not connect: " . mysql_error());

	mysql_select_db("c5");

	$result		= mysql_query("SET NAMES GBK");


	$text		= 'Hello_' . urldecode('%FC%5C');	// %FC%5C == ü\
	$template	= "INSERT INTO records SET content = '%s'";


#	$sql		= sprintf($template, addslashes($text));
#	$sql		= sprintf($template, mysql_escape_string($text));
	$sql		= sprintf($template, mysql_real_escape_string($text, $link));


	$result		= mysql_query($sql);
	if (empty($result)) {
		echo	sprintf("Error SQL: %s \n", $sql);
		echo	mysql_error();
	}


	echo	sprintf("\n---- SELECT ----\n");


	$result		= mysql_query('SELECT * FROM records ORDER BY id DESC LIMIT 0, 5');

	if (empty($result)) {
		echo	mysql_error();
		echo	sprintf("Table is empty!");
	}

	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {

		printf ("ID: %s  Content: [ %s ] \n", $row["id"], $row["content"]);

	}

	mysql_free_result($result);

