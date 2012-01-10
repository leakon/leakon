<?php

$arrDocType	= array();
$arrDocType[]	= '';
$arrDocType[]	= '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
$arrDocType[]	= '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
$arrDocType[]	= '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"　"http://www.w3.org/TR/html4/loose.dtd">';

echo	$arrDocType[ intval($_REQUEST['doctype']) ];

$arrHtml	= array(
	'<font color=CC0033>Leakon</font>',
	'<font color="CC0033">Leakon</font>',
	'<font color=#CC0033>Leakon</font>',
	'<font color="#CC0033">Leakon</font>',
//	'<font style="color:CC0033">Leakon</font>',
//	'<font style="color:#CC0033">Leakon</font>',
);

?>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Baidu</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>

<body>

Change DocType:
<br />

<?php

$selfPage	= basename(__FILE__);

foreach($arrDocType as $key => $type) {

	if (empty($type)) {
		$type	= 'None';
	}

	echo	'<a href="'.$selfPage.'?doctype='.$key.'">' . htmlspecialchars($type) . '</a><br />';
}



foreach($arrHtml as $html) {

	echo	'<p>';
	echo	'The html code is : ' . htmlspecialchars($html) . '<br />';
	echo	'The browser show : ' . $html;
	echo	'</p>';

}

?>


</body>
</html>
