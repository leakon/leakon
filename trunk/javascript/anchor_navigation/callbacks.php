<?php

$section	= $_GET['section'];


$arr['home']	= '	<h1>You are at home</h1>
	<p>Wellcome to the new tutorial from <a href="http://www.yensdesign.com">yensdesign.com</a>. Enjoy it!! :)</p>
	<p><strong>Look at the URL! It changes but page doesn\'t reload!!</strong></p>
	';

$arr['tutorials']	= '		<h1>The tutorials section is good for your brain</h1>
	<p>This tutorial can be very very interesting in dynamic projects, play with it ;)</p>
	';
$arr['webdesign']	= '			<h1>Web design at yensdesign.com</h1>
		<p>And remember: Visit us!!! <a href="http://www.yensdesign.com">yensdesign.com</a></p>
		';
$arr['coding']	= '			<h1>Coding</h1>
		<p>Hellow World!</p>
		';

if (isset($arr[$section])) {
	echo	$arr[$section];
}
