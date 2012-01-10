<?php
header("Content-Type: text/html; charset=UTF-8");
require_once('detect_utf8.php');

$requestWord	= $_GET['word'];

if (!DetectUT8::isUTF8($requestWord)) {
	$requestWord		= DetectUT8::stringConvert($requestWord, 'GBK', 'UTF-8');
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-CN" lang="zh-CN">
<head>
<title>Detect UTF-8</title>
</head>

<body>

<p>
	Received Word is : <?php echo $requestWord; ?>
</p>
<p>
	UTF-8 Encoded String is : <?php echo urlencode($requestWord); ?>
</p>

<hr />

<p>
<form name="dutf8" id="dutf8" action="">
	Word:
	<br />
	<input type="text" name="word" size="30" value="<?php echo htmlspecialchars($requestWord);?>" />
	<br />
	<input type="submit" value="SubWord" />
</form>
</p>

</body>
</html>